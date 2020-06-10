const express = require('express');
const axios = require('axios');
const apiKey = require('../sources/keys.json').apiKey;
const router = express.Router()

router.get('/', (req, res) => {
 res.render('welcome')
});

router.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const response = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    const data = response.data;
    const weatherInfo = {
      temp: data.main.temp,
      max: data.main.temp_max,
      min: data.main.temp_min,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      desc: data.weather[0].description,
      name: data.name,
      windSpeed : data.wind.speed,
      sunrise: `${new Date(data.sys.sunrise).getHours()}:${new Date(data.sys.sunrise).getMinutes()}`,
      sunset: `${new Date(data.sys.sunset).getHours()}:${new Date(data.sys.sunset).getMinutes()}`,
      country: data.sys.country
    };
    const icon = {
      weatherIcon: data.weather[0].id,
      windIcon: data.wind.deg
    };
    //If it is day time, icon will be sun, else it will be moon.
    const dayTime = data.dt < data.sys.sunset  ? true : false
    res.render('success', {
      weatherInfo,
      icon,
      dayTime
    })
  } catch (error) {
    const err = {
      status : error.response.status,
      city: ` - ${cityName}`,
      text: error.response.statusText
    }
    res.render('404', { err })
  }

});

module.exports = router;