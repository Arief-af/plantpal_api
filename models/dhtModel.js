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
            console.error("Error executing query:", err);  // Log error
            callback(err, null);
        } else {
            // Menyusun array berdasarkan hari dalam seminggu
            const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const labels = daysOfWeek.slice(1);  // Mengambil hanya Senin hingga Minggu
            const suhu = [];
            const kelembapan = [];
            const soil = [];

            // Mendapatkan data per hari
            result.forEach(row => {
                const dayIndex = row.day_of_week;  // Day of the week berdasarkan SQL (1 = Senin, ..., 7 = Minggu)
                suhu[dayIndex - 1] = parseFloat(row.rata_suhu.toFixed(2));  // Menyimpan suhu
                kelembapan[dayIndex - 1] = parseFloat(row.rata_humid.toFixed(2));  // Menyimpan kelembapan
                soil[dayIndex - 1] = parseFloat(row.rata_soil.toFixed(2));  // Menyimpan kelembapan tanah
            });

            // Menyusun hasil akhir
            const formattedResult = {
                label: labels,
                soil: soil,
                suhu: suhu,
                kelembapan: kelembapan,
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
