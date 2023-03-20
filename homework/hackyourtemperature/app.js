import {API_KEY} from "./sources/keys.js";
import fetch from "node-fetch";
import express from 'express';

function checkIfResponseIsOk(data, response){
  if(!data.ok){
    response.status(400)
    response.send('Bad Request')
  }
}

const app = express();
app.use(express.json());

app.get('/',(req, res) => {
    res.send('hello from backend to frontend!');
  });


app.post('/weather',async (req, res) => {
  const cityName = req.body.cityName
  try{
    const cityRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`);
    checkIfResponseIsOk(cityRes, res)

    const cityData = await cityRes.json()
    
    const lat = cityData[0].lat
    const lon = cityData[0].lon

    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    checkIfResponseIsOk(weatherRes, res)

    const weatherData = await weatherRes.json()
    const {name} = weatherData
    const {temp} = weatherData.main
    res.status(200)
    res.send({City : name, Temperature : temp})

} catch{
    res.status(404)
    res.send({ weatherText: "City is not found!" })
  }
});


export default app;