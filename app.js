const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { handleWebhook, handlePing } = require('./controllers/tradingview-webhook');
const binanceRoutes = require('./routes/binance');
const tvRoutes = require('./routes/tradingview');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/binance', binanceRoutes);
app.use('/tradingview', tvRoutes);

// TradingView webhook handler
app.post('/webhook', handleWebhook);

// TradingView ping-pong handler
app.get('/ping', handlePing);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Error', message: 'Something went wrong!' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
