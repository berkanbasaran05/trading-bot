const express = require('express');
const router = express.Router();
const { getAllTrades, closeTrade } = require('../controllers/binance-api');

router.get('/trades', async (req, res) => {
  try {
    const trades = await getAllTrades();
    res.render('trades', { title: 'All Trades', trades });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch trades');
  }
});

router.post('/close-trade', async (req, res) => {
  try {
    const { tradeId } = req.body;
    await closeTrade(tradeId);
    res.redirect('/binance/trades');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to close trade');
  }
});

module.exports = router;
