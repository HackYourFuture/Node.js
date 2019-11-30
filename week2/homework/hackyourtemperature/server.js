const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/weather', (req, res) => {
  res.send(req.body.cityName);
});

app.listen(3000, () => {
  console.log('server started at port ' + 3000);
});