require('dotenv').config();
const crypto = require('crypto');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET
});
const symbol = 'BTCUSDT'; // İşlem yapılacak sembol
const interval = '5m'; // Pmax sinyallerinin okunacağı zaman aralığı
const url = `https://scanner.tradingview.com/crypto/scan`;

const data = {
  "symbols": {
    "tickers": [
      symbol
    ],
    "query": {
      "types": []
    }
  },
  "columns": [
    "PMax.sell.2",
    "PMax.buy.2"
  ],
  "range": {
    "from": Math.floor((Date.now() - (60 * 60 * 24 * 30 * 1000)) / 1000), // 30 gün öncesinden itibaren verileri okuyoruz
    "to": Math.floor(Date.now() / 1000)
  },
  "sort": {
    "sortBy": "PMax.buy.2",
    "sortOrder": "desc"
  },
  "options": {
    "lang": "tr"
  },
  "filters": {
    "minVolume": null,
    "exchange": "BINANCE",
    "changeFromOpen": null,
    "changeFromClose": null
  }
};

const options = {
  method: 'POST',
  url: url,
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  const data = JSON.parse(body).data[0];
  const pmaxSell = data.d[0];
  const pmaxBuy = data.d[1];

  // Pmax verileri alındı, alım-satım yapma stratejisi burada olacak
});

binance.buy(symbol, quantity, price, {}, function(error, response) {
    // Alım işlemi tamamlandı
  });
  
  binance.sell(symbol, quantity, price, {}, function(error, response) {
    // Satış işlemi tamamlandı
  });
  