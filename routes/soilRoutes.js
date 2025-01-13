const express = require('express');
const router = express.Router();
const soilController = require('../controllers/soilController');

// Route untuk menambahkan data DHT
router.post('/soil', soilController.addSoilData);

// Route untuk mengambil semua data soil
router.get('/soil', soilController.getSoilData);
router.get('/soil/avg', soilController.getAvgData);

module.exports = router;
