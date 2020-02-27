'use strict'

const express=require('express')
const app=express()
const exphbs = require ('express-handlebars'); 
const port=3000


//Body parser middleware
app.use(express.urlencoded({extended:true}))


// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')



app.get('/', (req, res) => {
  res.render('index')
})

// testing in postman using x-www-form-urlencoded instead of raw. 
app.post('/weather', (req,res) => {
  const cityReq=req.body.cityName //taken from index.handlebars.
  res.send( {cityName : cityReq} )
})

app.listen(port, () =>{
  console.log(`Server running in port ${port}`)
})