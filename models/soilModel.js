const db = require("../config/db");

const SoilModel = {
  insertData: (soil_moisture, callback) => {
    const query = "INSERT INTO soil_readings (soil_moisture) VALUES (?)";
    db.execute(query, [soil_moisture], callback);
  },

  getAllData: (callback) => {
    const query = "SELECT * FROM soil_readings";
    db.execute(query, callback);
  },

  getAvgData: (callback) => {
    const query = `
          SELECT 
                MIN(soil_moisture) AS min_soil, 
                MAX(soil_moisture) AS max_soil, 
                AVG(soil_moisture) AS avg_soil
            FROM 
        soil_readings;
    `;
    db.execute(query, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const formattedResult = {
          min_soil: result[0].min_soil,
          max_soil: result[0].max_soil,
          avg_soil: parseFloat(result[0].avg_soil.toFixed(2)),
        };
        callback(null, formattedResult);
      }
    });
  },
};

module.exports = SoilModel;
