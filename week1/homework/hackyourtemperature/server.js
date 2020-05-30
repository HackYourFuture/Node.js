const express = require('express'),
  exphbs = require('express-handlebars'),
  axios = require('axios');

const app = express();

app.get('/', (req,res) => {
  res.send('hello from backend to frontend...')
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));