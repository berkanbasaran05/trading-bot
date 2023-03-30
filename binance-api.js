const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
  useServerTime: true,
  test: true
});

function getAllTrades(callback) {
  binance.futuresUserTrades('BTCUSDT', (error, trades) => {
    if (error) {
      console.error('Failed to fetch trades:', error);
      callback([]);
      return;
    }
    const formattedTrades = trades.map(trade => ({
      id: trade.orderId,
      symbol: trade.symbol,
      side: trade.isBuyer ? 'BUY' : 'SELL',
      price: parseFloat(trade.price),
      quantity: parseFloat(trade.qty),
      time: new Date(trade.time)
    }));
    callback(formattedTrades);
  });
}

function closeTrade(tradeId, callback) {
  getAllTrades(trades => {
    const trade = trades.find(t => t.id === tradeId);
    if (!trade) {
      console.warn(`Trade ${tradeId} not found`);
      callback(false);
      return;
    }
    const side = trade.side === 'BUY' ? 'SELL' : 'BUY';
    binance.futuresMarketOrder(trade.symbol, side, trade.quantity, { newOrderRespType: 'FULL' }, (error, response) => {
      if (error) {
        console.error(`Failed to execute ${side} order for trade ${trade.id}:`, error);
        callback(false);
        return;
      }
      console.log(`Successfully closed trade ${trade.id} with ${side} order:`, response);
      callback(true);
    });
  });
}

module.exports = {
  getAllTrades,
  closeTrade
};
