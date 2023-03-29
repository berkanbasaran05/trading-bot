const express = require('express');
const bodyParser = require('body-parser');
const { handleWebhook, handlePing } = require('./tradingview-webhook');
const { getAllTrades, closeTrade } = require('./binance-api');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/tradingview-webhook', handleWebhook);
app.get('/ping', handlePing);
app.get('/trades', getAllTrades);
app.post('/stop-trade', closeTrade);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${server.address().port}`);
});
