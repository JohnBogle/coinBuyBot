# BogleBot - All Coin Buy Bot 
[![Build Status][travis-badge]][travis-badge-url]



---

It is a bot to make it easy to buy all coins on Upbit and Bithumb exchanges market.

**You can easily buy all coin in Upbit and Bithumb.**

**모든 코인을 소유하라.**

1. “Owning the stock market over the long term is a winner’s game, but attempting to beat the market is a loser’s game.”
1. “장기적으로 주식 시장을 점유하는 것은 승자의 게임이지만, 시장을이기려는 것은 패자의 게임입니다.”

2. “Ask yourself: Am I an investor, or am I a speculator? An investor is a person who owns business and holds it forever and enjoys the returns that businesses have earned since the beginning of time. Speculation is betting on price. Speculation has no place in the portfolio or the kit of the typical investor.”
2. “자신에게 물어보십시오. 나는 투자자입니까, 아니면 투기자입니까? 투자자는 사업을 소유하고 영원히 보유하고 사업이 시작된 이후로 얻은 수익을 즐기는 사람입니다. 투기는 가격에 베팅하는 것입니다. 투기는 일반적인 투자자의 포트폴리오나 키트에 자리를 차지하지 않습니다.”

3. “In the long run, investing is not about markets at all. Investing is about enjoying the returns earned by businesses.”
3. “장기적으로 투자는 시장에 관한 것이 아닙니다. 투자는 기업이 얻은 수익을 즐기는 것입니다.”

4. “Buying funds based purely on their past performance is one of the stupidest things an investor can do.”
4. "순전히 과거 실적에 근거하여 펀드를 매수하는 것은 투자자가 할 수있는 가장 어리석은 일 중 하나입니다."

5. “Speculation leads you the wrong way. It allows you to put your emotions first, whereas investment gets emotions out of the picture.”
5.“투기는 당신을 잘못된 길로 인도합니다. 그것은 당신이 당신의 감정을 우선시하고 투자는 그림에서 감정을 가져옵니다.”

6. “Investing is not nearly as difficult as it looks. Successful investing involves doing a few things right and avoiding serious mistakes.”
6.“투자는보기만큼 어렵지 않습니다. 성공적인 투자에는 몇 가지 일을 올바르게하고 심각한 실수를 피하는 것이 포함됩니다. "
 
7. “When there are multiple solutions to a problem, choose the simplest one.”
7. “문제에 대한 여러 가지 해결책이있는 경우 가장 간단한 해결책을 선택하십시오.”


## Quickstart Bogle Bot

- Install Nodejs v.17.0.1 
- Copy the code you have in your project's folder.
- `npm install`
- Make `Bittumb API key ` <a href="https://www.bithumb.com/api_support/management_api" target="_blank" title="">빗썸 API</a>
- Make `Upbit API key ` <a href="https://upbit.com/service_center/open_api_guide" target="_blank" title="">업비트 API</a>
- Modify config.json
- `node bogleBittumbAllBuy.js ` starting buy coin in Bittumb.
- `node bogleUpbitAllBuy.js ` starting buy coin in Upbit.

## Quickstart Bogle Bot
- NodeJs 를 설치 하세요. <a href="https://nodejs.org/ko/" target="_blank" title="Installing Node.js and updating npm">
다운로드 NodeJs</a>
- 소스를 다운 받아 폴더안에 넣으세요.
- `npm install` 를 cmd에서 실행 사세요
- `Bittumb API key `를 생성 하세요. <a href="https://www.bithumb.com/api_support/management_api" target="_blank" title="">빗썸 API</a>
- `Upbit API key `를 생성 하세요. <a href="https://upbit.com/service_center/open_api_guide" target="_blank" title="">업비트 API</a>
- `config.json` 을 수정 하세요
- `node bogleBittumbAllBuy.js `하시면 빗썸 매수봇이 시작합니다.
- `node bogleUpbitAllBuy.js ` 하시면 업비트 매수봇이 시작합니다.

Now you can continue working on the new project.

## Prerequisites

Node.js and npm are essential to BogleBot
    
<a href="https://nodejs.org/ko/" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running at least node `v17.0.1` and npm `8.1.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.


## config.json 

    
    
    "bittumb_key": {
        "access_key" : bittumb_access_ke", //api 발급후 수정
        "secret_key" : "bittumb_secret_key" //api 발급후 수정
    },
    "bittumb_config": {
        "buy_price" : "2000", // 빗썸 코인당 매수가격        
        "no_buy_coin" : "BTC,ETH", // 매수 하지 않을 코인        
        "buy_coin" : "" // 입력없으면 모든 코인, BTC,ETH 게 입력하면 특정 코인만 매수 가능
    },            
    "upbit_key": {
        "access_key" : "upbit_access_key",  //api 발급후 수정       
        "secret_key" : "upbit_secret_key"  //api 발급후 수정      
    },    
    "upbit_config": {    
        "buy_price" : "5000", // 업비트 코인당 매수가격        
        "no_buy_coin" : "", // 매수 하지 않을 코인        
        "buy_coin" : "BTC,ETH" // 입력없으면 모든 코인, BTC,ETH 게 입력하면 특정 코인만 매수 가능
    }

