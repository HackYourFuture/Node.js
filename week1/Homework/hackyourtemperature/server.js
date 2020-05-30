const express = require('express')
const expHBs = require('express-handlebars')
const axios = require('axios')

const app = express();

app.get('/', (req,res) => {
  res.send('hello from backend to frontend...')
})

const port = process.env.PORT || 3000;
app.listen(port);