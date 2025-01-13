const db = require('../config/db');

const DhtModel = {
    insertData: (temperature, humidity, callback) => {
        const query = 'INSERT INTO dht_readings (temperature, humidity) VALUES (?, ?)';
        db.execute(query, [temperature, humidity], callback);
    },

    getAvgData: (callback) => {
        const query = `
            SELECT 
                MIN(temperature) AS min_suhu, MAX(temperature) AS max_suhu, AVG(temperature) AS rata_suhu,
                MIN(humidity) AS min_humid, MAX(humidity) AS max_humid, AVG(humidity) AS rata_humid
            FROM dht_readings
        `;
        db.execute(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                const formattedResult = {
                    min_suhu: result[0].min_suhu,
                    max_suhu: result[0].max_suhu,
                    rata_suhu: parseFloat(result[0].rata_suhu.toFixed(2)),
                    min_humid: result[0].min_humid,
                    max_humid: result[0].max_humid,
                    rata_humid: parseFloat(result[0].rata_humid.toFixed(2)),
                };
                callback(null, formattedResult);
            }
        });
    },

    getChartData: (callback) => {
        const query = `
            SELECT 
                DAYOFWEEK(dht.created_at) AS day_of_week,
                AVG(dht.temperature) AS rata_suhu,
                AVG(dht.humidity) AS rata_humid,
                AVG(soil.soil_moisture) AS rata_soil
            FROM dht_readings dht
            LEFT JOIN soil_readings soil ON DATE(dht.created_at) = DATE(soil.created_at)
            GROUP BY day_of_week
            ORDER BY day_of_week;
        `;
        db.execute(query, (err, result) => {
            if (err) {
                console.error("Error executing query:", err); // Log error
                callback(err, null);
            } else {
                // Hari dalam seminggu dimulai dari Minggu hingga Sabtu
                const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                
                // Inisialisasi array untuk hasil
                const suhu = Array(7).fill(null); // Isi awal dengan null
                const kelembapan = Array(7).fill(null); // Isi awal dengan null
                const soil = Array(7).fill(null); // Isi awal dengan null
    
                // Memetakan hasil query ke array
                result.forEach(row => {
                    const dayIndex = row.day_of_week - 1; // DAYOFWEEK: 1 = Minggu, ..., 7 = Sabtu
                    suhu[dayIndex] = row.rata_suhu ? parseFloat(row.rata_suhu.toFixed(2)) : null;
                    kelembapan[dayIndex] = row.rata_humid ? parseFloat(row.rata_humid.toFixed(2)) : null;
                    soil[dayIndex] = row.rata_soil ? parseFloat(row.rata_soil.toFixed(2)) : null;
                });
    
                // Hasil akhir dalam format yang diminta
                const formattedResult = {
                    label: daysOfWeek,
                    suhu: suhu,
                    kelembapan: kelembapan,
                    soil: soil,
                };
    
                callback(null, formattedResult);
            }
        });
    },
    
    

    getAllData: (callback) => {
        const query = "SELECT * FROM dht_readings";
        db.execute(query, callback);
      },
};

module.exports = DhtModel;
