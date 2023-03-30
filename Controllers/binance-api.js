const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET
});

async function getAllTrades() {
  try {
    const trades = await binance.trades();
    return trades;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function closeTrade(symbol, tradeId) {
  try {
    const result = await binance.futuresMarketSell(symbol, tradeId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getAllTrades, closeTrade };
