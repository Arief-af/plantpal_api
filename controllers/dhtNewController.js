const DhtModel = require('../models/dhtModel');
// Menambahkan data DHT ke database
exports.getAvgData = (req, res) => {
    DhtModel.getAvgData((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
};

// Mendapatkan semua data DHT
exports.getData = (req, res) => {
    DhtModel.getAllData((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
};

