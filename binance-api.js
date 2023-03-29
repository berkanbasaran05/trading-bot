const Binance = require('node-binance-api');

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET,
  useServerTime: true,
  test: true,
});

function getAllTrades(req, res) {
  binance.allOrders('BTCUSDT', (error, orders) => {
    if (error) {
      console.error('Failed to get all trades:', error);
      res.status(500).send('Failed to get all trades');
      return;
    }
    res.json(orders);
  });
}

function closeTrade(req, res) {
  const orderId = req.body.orderId;
  binance.cancel('BTCUSDT', orderId, (error, response) => {
    if (error) {
      console.error('Failed to close trade:', error);
      res.status(500).send('Failed to close trade');
      return;
    }
    res.send('Trade closed');
  });
}

module.exports = {
  getAllTrades,
  closeTrade,
};
