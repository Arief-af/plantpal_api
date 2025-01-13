// const WebSocket = require('ws');
const DhtModel = require('../models/dhtModel');
// const SoilModel = require('../models/soilModel')

// const wss = new WebSocket.Server({ port: 8080 });

// function broadcastData(data) {
//     wss.clients.forEach(client => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(data));
//         }
//     });
// }

// exports.addData = (req, res) => {
//     console.log(req.body);
//     const { temperature, humidity, soil_moisture } = req.body;

//     if (!temperature || !humidity || !soil_moisture) {
//         return res.status(400).json({ error: 'temperature and humidity are required' });
//     }

//     DhtModel.insertData(temperature, humidity, (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to insert data' });
//         }

//         // Kirim data ke semua klien WebSocket yang terhubung
        
//         res.status(201).json({ message: 'Data inserted successfully' });
//     });
    
//     SoilModel.insertData(soil_moisture, (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to insert data' });
//         }
//         res.status(201).json({ message: 'Data inserted successfully' });
//     });
    
//     broadcastData({ temperature, humidity, soil_moisture });

// };

// Mendapatkan semua data DHT
exports.getDhtData = (req, res) => {
    DhtModel.getAllData((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
};

exports.getAvgData = (req, res) => {
    DhtModel.getAvgData((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
};

exports.getChartData = (req, res) => {
    DhtModel.getChartData((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
};

// Menangani koneksi WebSocket
// wss.on('connection', (ws) => {
//     console.log('Client connected to WebSocket');
//     ws.on('close', () => console.log('Client disconnected from WebSocket'));
// });

// Fungsi untuk mengirim data dummy secara berkala
// function generateDummyData() {
//     // Kisaran suhu antara 20 - 40 derajat (untuk menguji berbagai kondisi)
//     const temperature = (Math.random() * 20 + 20).toFixed(2); 
    
//     // Kisaran kelembapan udara antara 10 - 60% (untuk mencakup kondisi kritis dan ideal)
//     const humidity = (Math.random() * 50 + 10).toFixed(2);    
    
//     // Kisaran kelembapan tanah antara 10 - 60% (untuk mencakup kondisi kering dan ideal)
//     const soil_moisture = (Math.random() * 50 + 10).toFixed(2);   

//     // Panggil fungsi `addData` seolah-olah data dikirim melalui HTTP POST
//     exports.addData(
//         { body: { temperature, humidity, soil_moisture } }, 
//         { status: (code) => ({ json: (data) => console.log(`Status: ${code}`, data) }) }
//     );
// }

// Memanggil fungsi `generateDummyData` setiap 5 detik
// setInterval(generateDummyData, 5000);

