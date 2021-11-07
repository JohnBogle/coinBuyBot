import fetch from 'node-fetch';
import sleep from 'sleep-promise';
import request from 'request';
import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto';
import pkg from 'jsonwebtoken';
const { jwt } = pkg;
import { encode as queryEncode } from 'querystring';


import fs from "fs";
const jsonFile = fs.readFileSync('./config.json', 'utf8');
const config = JSON.parse(jsonFile);

const access_key = config.upbit_key.access_key;
const secret_key = config.upbit_key.secret_key;
const server_url = 'https://api.upbit.com';

const noBuyCoin = config.upbit_config.no_buy_coin;
const noBuyCoinList = noBuyCoin.split(',');

const buyCoin = config.upbit_config.buy_coin;
const buyCoinList = buyCoin.split(',');

var buyPrice = config.upbit_config.buy_price;

var allCoin;
var allCoinInfo = [];
var remainingSec;

fn_getAllCoin();

function fn_getAllCoin(){
    const url = 'https://api.upbit.com/v1/market/all?isDetails=true';
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    fetch(url, options)
        .then(res => {            
            res.json().then(json => {
                remainingSec = res.headers.get('remaining-req').split(';')[2].split('=')[1];
                allCoin = json.filter(coin => coin.market.includes('KRW'));
                fn_getAllCoinInfo(allCoin);
            })
        })        
        .catch(err => console.error('error:' + err));
}

async function fn_getAllCoinInfo(coins){
    for(var i in coins){
        var coin = coins[i].market.split('-')[1];
        if(buyCoinList.length > 0 && buyCoinList[0] != '' && !chkBuyCoin(coin)){
            continue; //설정에 buy coin 만 통과
        }

        if(noBuyCoinList.length > 0 && noBuyCoinList[0] != '' ){
            if(chkNoBuyCoin(coin)) continue; //설정에 no buy coin 제외
        }
        await sleep(1000);
        fn_getAllCoinInfoForUpbit(coins[i]);
    }   
}


async function fn_getAllCoinInfoForUpbit(coin){  
    const url = 'https://api.upbit.com/v1/candles/weeks?count=1&market=' + coin.market;
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
        
    await fetch(url, options)
        .then(res => {
            remainingSec = res.headers.get('remaining-req').split(';')[2].split('=')[1];            
            res.json().then(json => { 
                allCoinInfo.push(json);
                
                fn_getAllCoinInfoCallback(json);
                
            })
        })        
        .catch(err => console.error('error:' + err));
}

function fn_getAllCoinInfoCallback(coin){
    var body = {
        market: coin[0].market,
        side: 'bid',
        price: buyPrice,
        ord_type: 'price',
    }
    
    fn_buy(body);
    //console.log(body);
    
}

function fn_buy(coin){

    var query = queryEncode(coin);
    var hash = crypto.createHash('sha512');
    var queryHash = hash.update(query, 'utf-8').digest('hex');
    
    var payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    };

    var token = pkg.sign(payload, secret_key);

    var options = {
        method: "POST",
        url: server_url + "/v1/orders",
        headers: {Authorization: `Bearer ${token}`},
        json: coin
    };
    
    request(options, (error, response, body) => {
        if (error)throw new Error(error);
     
        console.log(body);
       
    })
}


function chkNoBuyCoin(coin) {
    var rst;
    if(noBuyCoinList.length > 0){
        rst = noBuyCoinList.filter(x => x.indexOf(coin) !== -1);
        if(rst.length > 0){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function chkBuyCoin(coin) {
    var rst;
    if(buyCoinList.length > 0){
        rst = buyCoinList.filter(x => x.indexOf(coin) !== -1);
        if(rst.length > 0){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
