import fetch from 'node-fetch';
import sleep from 'sleep-promise';

import ApiBithumb from "node-bithumb";

import fs from "fs";
const jsonFile = fs.readFileSync('./config.json', 'utf8');
const config = JSON.parse(jsonFile);

const noBuyCoin = config.bittumb_config.no_buy_coin;
const noBuyCoinList = noBuyCoin.split(',');

const buyCoin = config.bittumb_config.buy_coin;
const buyCoinList = buyCoin.split(',');

const BithumbApi = new ApiBithumb.default(config.bittumb_key.access_key, config.bittumb_key.secret_key, "KRW");

var buyPrice = config.bittumb_config.buy_price;

fn_getAllCoin();


function fn_getCoinInfoOne(coin){
    var url = 'https://api.bithumb.com/public/ticker/'+ coin+'_KRW';
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    fetch(url, options)
        .then(res => {            
            res.json().then(json => {
                var coinInfoData = new Object();
                coinInfoData[buyCoinList[i]] = json;
                return coinInfoData;
            })
        })        
        .catch(err => console.error('error:' + err));
}


function fn_getAllCoin(){
    const url = 'https://api.bithumb.com/public/ticker/all_KRW ';
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    fetch(url, options)
        .then(res => {            
            res.json().then(json => {
                
                fn_getAllCoinInfo(json);
            })
        })        
        .catch(err => console.error('error:' + err));
}

var coinNm;
var coinInfo;
var bittumbCnt = 0;

var coinList = [];


async function fn_getAllCoinInfo(coins){ 
    var cnt = 0;
    for(var i in coins.data){
        if(buyCoinList.length > 0 && buyCoinList[0] != '' && !chkBuyCoin(i)){
            continue; //설정에 buy coin 만 통과
        }
        await sleep(1000);
       
        var coin = {};
        coinNm = i;
       
        if(noBuyCoinList.length > 0 && noBuyCoinList[0] != '' ){
            if(coinNm == 'date' || chkNoBuyCoin(coinNm)) continue; //설정에 no buy coin 제외
        }
        
        coinInfo = JSON.parse(JSON.stringify(coins.data[i]));

        
        bittumbCnt++;
        coin.ticker = coinNm;
        coin.acc_trade_value_24H = coinInfo.acc_trade_value_24H;
        coinList.push(coin);

        var coin = await BithumbApi.getTicker(coinNm);
        var coinMarketPrice = coin.data.closing_price;
        var coinMarketBuyUnit = buyPrice / coinMarketPrice;
        coinMarketBuyUnit = coinMarketBuyUnit.toFixed(4);
        var coinBuyPrice = (coinMarketBuyUnit * coinMarketPrice).toFixed(2);
        if(coinMarketBuyUnit > 0){
            console.log(cnt + '. 매수 코인 : ' +coinNm + ', 주문금액 : '+coinMarketPrice + ', 주문수량 : ' + coinMarketBuyUnit+ ', 매수금액 : ' + coinBuyPrice);
           
            const buyRes = await BithumbApi.postMarketBuy(coinMarketBuyUnit, coinNm);            
        }else{
            console.log(cnt + '주문 에러 -- > 매수 코인 : ' +coinNm + ', 주문금액 : '+coinMarketPrice + ', 주문수량 : ' + coinMarketBuyUnit+ ', 매수금액 : ' + coinBuyPrice);
        }
        cnt++;        
    }   
    console.log('total : ' +bittumbCnt);
  
    coinList.slice().sort(function(a, b) {
        return a.acc_trade_value_24H - b.acc_trade_value_24H;
    });
    
   
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


