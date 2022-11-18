import express from 'express';
import fetch from 'node-fetch';
import { API_Key } from './sources/keys.js' 

const app = express()
app.use(express.json())

app.get('/' , (req , res) => {
  res.end('hello from backend to frontend!')
})

app.post('/weather' , (req , res) => {
  const city = req.body.cityName
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`)
  .then(response => response.json())
  .then(data => {
    if(city) {
      res.json({weatherText: `${data.name} , ${data.main.temp}°F`})
    } else {
      res.json({weatherText: "City is not found!"})
    }
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`Server is running on ${PORT}`))