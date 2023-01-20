/*eslint no-undef: "error"*/
/*eslint-env node*/

import express from 'express';
import fetch, { Response } from 'node-fetch';
import keys from './sources/keys.js';
//import exphbs from 'express-handlebars';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const cityName = req.body.city;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`,
    );

    if (response.status === 200) {
      const forecast = await response.json();
      console.log(response);
      console.log(forecast);
      const currentTemp = forecast.main.temp;

      res
        .status(200)
        .send({
          weatherText: `current temperature in ${cityName} is ${currentTemp}°C`,
        });
    } else {
      res.status(404).send({ weatherText: 'City is not found!' });
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
