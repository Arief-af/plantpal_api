const express = require('express');
const router = express.Router();
const dhtNewController = require('../controllers/dhtNewController');

router.get('/dht-new', dhtNewController.getData);
router.get('/dht-avg', dhtNewController.getAvgData);

module.exports = router;
