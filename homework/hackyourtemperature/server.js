import express, { application } from 'express';
import expressHandlebars from "express-handlebars";
import fetch from "node-fetch";
import {API_KEY} from "./sources/keys.js";

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
      throw new Error('http error 1')
    }
    const cityData = await cityRes.json()
    if(cityData.length === 0){
      res.status(404)
      res.send({ weatherText: "City is not found!" })
    }
    const lat = cityData[0].lat
    const lon = cityData[0].lon

    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    if(!weatherRes.ok){
      throw new Error('http error 2')
    }
    const weatherData = await weatherRes.json()
    const {name, main} = weatherData
    res.status(200)
    res.send({name, main})} catch(error){
    console.log(error.message)
  }
});



app.listen(3000, () => {
    console.log('Server started on port 3000');
  });