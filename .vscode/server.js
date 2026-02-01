require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // Node.js fetch
const app = express();

app.get('/weather', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

    // Example using Open-Meteo (no key required)
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    
    try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch weather' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

