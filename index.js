// import uniswap sdk
const {
    ChainId, 
    Fetcher, 
    WETH, 
    Route,
    Trade,
    TokenAmount,
    TradeType,
    Percent
} = require("@uniswap/sdk");
const { Wallet } = require("ethers");
// import ethers
const ethers = require("ethers");

require('dotenv').config();

// set chain id to mainnet
const chainId = ChainId.MAINNET;
// dai ether mainnet address
const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

// grab token data
const init = async() => {

    // dai token data
    const dai = await Fetcher.fetchTokenData(chainId, tokenAddress);
    // we can just import WETH data from uniswap sdk
    const weth = WETH[chainId];

    // define pair object
    const pair = await Fetcher.fetchPairData(dai, weth);
    // define a route that accepts an array of our desired pairs, and our input token
    const route = new Route([pair], weth);
     // create a trade object that takes our route, the input info (given the trade type)
     const trade = new Trade(
        route, 
        new TokenAmount(
            weth, 
            "100000000000000000"
        ), 
        TradeType.EXACT_INPUT
    );
    // find the price with 6 sigfigs dai per eth (input token weth gives dai)
    console.log("WETH Price in DAI: " + route.midPrice.toSignificant(6));
    // to find the opposite eth per dai
    console.log("1 DAI = " + route.midPrice.invert().toSignificant(6)) + " WETH";
    // log the execution price for this trade
    console.log(trade.executionPrice.toSignificant(6));
    // find the next price after this trade (due to bonding curve)
    console.log(trade.nextMidPrice.toSignificant(6));

    // define slippage tolerance as 50 bips
    slippageTolerance = new Percent('50', '10000');

    // define the minimum amount we want to buy
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;

    // path of our trade
    const path = [weth.address, dai.address];

    const to = "";

    // set a deadline for our trade for 20 minutes
    const deadline = Math.floor(Date.now() / 1000 * 20 * 60);

    // how much are we going to send (input)
    const value = trade.inputAmount.raw

    // create provider
    const provider = ethers.getDefaultProvider("mainnet", {
        infura: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`
    });

    const signer = new ethers.Wallet(PRIVATE_KEY);

}

init();




