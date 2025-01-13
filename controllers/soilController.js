const SoilModel= require('../models/soilModel')
// Menambahkan data DHT ke database
exports.addSoilData = (req, res) => {
    console.log(req.body);
    const { soil_moisture } = req.body;

    if (!soil_moisture) {
        return res.status(400).json({ error: 'soil value is required' });
    }

    SoilModel.insertData(soil_moisture, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data' });
        }
        res.status(201).json({ message: 'Data inserted successfully' });
    });
};

// Mendapatkan semua data DHT
exports.getSoilData = (req, res) => {
    SoilModel.getAllData((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
};

exports.getAvgData = (req, res) => {
    SoilModel.getAvgData((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
};
