const express = require('express');
const { API_KEY } = require('./sources/key.js');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});
app.post('/weather', async (req, res) => {
  const { cityName } = req.body;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ weatherText: `City is not found! ${cityName}` });
  }
});

app.listen(port);