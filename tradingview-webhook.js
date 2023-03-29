const { marketBuy, marketSell } = require('./binance-api');

function handleWebhook(req, res) {
  const signal = req.body.signal;
  const amount = req.body.amount;
  if (signal === 'buy') {
    marketBuy('BTCUSDT', amount, (error, response) => {
      if (error) {
        console.error('Failed to execute buy order:', error);
        res.status(500).send('Failed to execute buy order');
        return;
      }
      console.log('Buy order executed:', response);
      res.send('Buy order executed');
    });
  } else if (signal === 'sell') {
    marketSell('BTCUSDT', amount, (error, response) => {
      if (error) {
        console.error('Failed to execute sell order:', error);
        res.status(500).send('Failed to execute sell order');
        return;
      }
      console.log('Sell order executed:', response);
      res.send('Sell order executed');
    });
  } else {
    console.warn('Unknown signal received:', signal);
    res.status(400).send('Unknown signal received');
  }
}

function handlePing(req, res) {
  res.send('Pong!');
}

module.exports = {
  handleWebhook,
  handlePing,
};
