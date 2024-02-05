import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});



app.post('/weather', async (req, res) => {
  const { cityName } = req.body;

  if (!cityName || cityName.trim() === '') {
    return res.status(400).send(`City Name is required`);
  }

  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys}`);

    const data = await response.json();


    if (response.status !== 200) {
      if (!/^[a-zA-Z\s]+$/.test(cityName)) {
        res.status(400).send(`Invalid Characters in cityName`);
        return;
      }
      res.status(response.status).json({ weatherText: 'City Is Not Found!' }); //json instead of send
      return;
    }

    const temperature = data.main.temp;
    res.json({ weatherText: `${cityName} : ${temperature}` });


  } catch (err) {
    console.error('Error with fetching data! : ', err);
    res.status(500).send('Internal Server Error');
  }

});




export default app;