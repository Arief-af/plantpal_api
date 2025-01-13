const mqtt = require('mqtt');
const DhtModel = require('../models/dhtModel');
const SoilModel = require('../models/soilModel');

const mqttClient = mqtt.connect('mqtt://plantpal-mqtt.zqdevs.my.id');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker1');
    mqttClient.subscribe('plantpal/data', (err) => {
        if (err) {
            console.log('Error subscribing to topic', err);
        } else {
            console.log('Subscribed to topic plantpal/data');
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        console.log(data);

        // Check if all required properties are present
        if (
            typeof data.temperature === 'undefined' ||
            typeof data.humidity === 'undefined' ||
            typeof data.soil_moisture === 'undefined'
        ) {
            console.log('Invalid MQTT message format');
            return;
        }

        const { temperature, humidity, soil_moisture } = data;

        // Insert temperature and humidity into the database
        DhtModel.insertData(temperature, humidity, (err) => {
            if (err) {
                console.error('Failed to insert DHT data:', err);
            } else {
                console.log('DHT data inserted successfully');
            }
        });

        // Insert soil moisture into the database
        SoilModel.insertData(soil_moisture, (err) => {
            if (err) {
                console.error('Failed to insert soil moisture data:', err);
            } else {
                console.log('Soil moisture data inserted successfully');
            }
        });

        console.log(`Data saved: Temperature: ${temperature}, Humidity: ${humidity}, Soil Moisture: ${soil_moisture}`);
    } catch (err) {
        console.error('Error processing MQTT message:', err);
    }
});


module.exports = mqttClient;