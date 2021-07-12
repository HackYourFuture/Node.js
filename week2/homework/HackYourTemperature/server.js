const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.send('Hello from backend to frontend!');
});

app.get('/weather', (req, res) => {
  res.render('index')
})

app.post('/weather', (req, res) => {
  res.render('index')
  const cityName = req.body.cityName
})

app.listen(3000);