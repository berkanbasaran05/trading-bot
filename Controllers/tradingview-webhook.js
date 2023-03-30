const { placeMarketOrder } = require('./binance-api');

const handleWebhook = async (req, res) => {
  const { symbol, side, quantity } = req.body;

  // Check if the webhook was triggered by the expected alert
  if (req.headers['user-agent'] !== 'TradingView Alert') {
    console.log('Unexpected User-Agent');
    return res.status(400).send('Bad Request');
  }

  // Place the market order on Binance
  try {
    const response = await placeMarketOrder(symbol, side, quantity);
    console.log(response);
    res.status(200).send('Order Placed');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to place order');
  }
};

module.exports = {
  handleWebhook,
};
