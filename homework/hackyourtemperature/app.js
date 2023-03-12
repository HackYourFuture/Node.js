import {API_KEY} from "./sources/keys.js";
import fetch from "node-fetch";
import express from 'express';

const app = express();

app.get('/',(req, res) => {
    res.send('hello from backend to frontend!');
  });

app.use(express.json());


app.post('/weather',async (req, res) => {
  const cityName = req.body.cityName
  try{
    const cityRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`);
    if(!cityRes.ok){
      res.status(400)
      res.send('http error')
    }
    const cityData = await cityRes.json()
    
    const lat = cityData[0].lat
    const lon = cityData[0].lon

    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    if(!weatherRes.ok){
        res.status(400)
        res.send('http error')
    }
    const weatherData = await weatherRes.json()
    const {name} = weatherData
    const {temp} = weatherData.main
    res.status(200)
    res.send({City : name, Temperature : temp})

} catch(error){
    res.status(404)
    res.send({ weatherText: "City is not found!" })
  }
});


export default app;