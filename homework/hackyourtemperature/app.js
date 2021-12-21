import express from 'express';
import fetch from 'node-fetch';
import { keys } from './sources/keys.js';

const app = express();
app.use(express.json());
export const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.write('hello from backend to frontend!');
  res.end();
});

app.post('/weather', async (req, res) => {
  const city = req.body.cityName;
  const fetchResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?APPID=${keys.API_KEY}&q=${city}`,
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const weatherInfo = {
        weatherText: `temperature: ${data.main.temp} , cityName: ${data.name}`,
      };
      return weatherInfo;
    })
    .catch((error) => {
      const weatherInfo = {
        weatherText: `City is not found!`,
      };
      return weatherInfo;
    });

  res.send(fetchResponse);
});
export default app;
