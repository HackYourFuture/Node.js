import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const cityName = req.body.city;
  console.log('Client requested weather in ', req.body.city);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`,
    );

    if (response.status === 200) {
      const forecast = await response.json();
      const currentTemp = forecast.main.temp;
      console.log(
        `Response sended: current temperature in ${cityName} is ${currentTemp}°C`,
      );
      //res.setHeader('Content-Type', 'application/json'); // need or not???
      res.status(200).send({
        weatherText: `current temperature in ${cityName} is ${currentTemp}°C`,
      });
    } else {
      console.log('Response sended: City is not found!');
      res.status(404).send({ weatherText: 'City is not found!' });
    }
  } catch (error) {
    console.error(error);
  }
});

export default app;
