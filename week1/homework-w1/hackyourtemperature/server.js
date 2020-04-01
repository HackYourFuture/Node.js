const express = require('express')
const handlebars =require('express-handlebars') //require handlebars
const axios =require('axios') //require axios
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)