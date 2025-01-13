const express = require('express');
const router = express.Router();
const dhtController = require('../controllers/dhtController');

// Route untuk menambahkan data DHT
// router.post('/add-data', dhtController.addData);

// Route untuk mengambil semua data DHT
router.get('/dht', dhtController.getDhtData);
router.get('/dht/avg', dhtController.getAvgData);
router.get('/chart', dhtController.getChartData);

module.exports = router;
