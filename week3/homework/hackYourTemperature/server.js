'use strict'

const express=require('express')
const app=express()
const exphbs = require ('express-handlebars'); 
const port=3000

const axios=require('axios')
const APIKEY=require('./sources/keys.json').api_key

//Body parser middleware
app.use(express.urlencoded({extended:true}))


// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//static css
app.use(express.static("static"));



app.get('/', (req, res) => {
  const greeting=`Welcome to my Weather App`
  res.render('index', {greeting})
})

app.post('/weather', (req,res) => {
  const cityReq=req.body.cityName 
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityReq}&appid=${APIKEY}&units=metric`

  axios.get(url)
  .then(res => {
    return res.data
  })
  .then(json => {
    const temp=`Temperature in ${json.name} is ${json.main.temp} °C`
    const maxTemp=`Max Temperature is ${json.main.temp_max} °C`
    const minTemp=`Min Temperature is ${json.main.temp_min} °C`
    const weatherDetails={temp,maxTemp,minTemp} // to be sent to index.handlebars in one go. 
    res.render('index', weatherDetails)
  })
  .catch(err => {
    const errMessage = `Error detected, ${err.response.data.cod} ${err.response.data.message}`
    res.render('index', {errMessage})
  })
})

app.listen(port, () =>{
  console.log(`Server running in port ${port}`)
})