require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Require the cors package
const bodyParser = require('body-parser');
const dhtRoutes = require('./routes/dhtRoutes');
const soilRoutes = require('./routes/soilRoutes');
const DhtNewRoutes = require('./routes/dhtNewRoutes');
const mqttController = require('./controllers/mqttController'); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Routes
app.use('/api', dhtRoutes);
app.use('/api', soilRoutes);
app.use('/api', DhtNewRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
