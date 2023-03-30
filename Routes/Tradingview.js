const express = require('express');
const router = express.Router();
const { handleWebhook, handlePing } = require('../controllers/tradingview-webhook');

router.post('/webhook', handleWebhook);
router.get('/ping', handlePing);

module.exports = router;
