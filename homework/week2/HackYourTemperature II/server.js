const http = require('http');
const express = require('express')
const app = express()
const fs = require("fs");
app.use(express.json());
const exphbs = require('express-handlebars');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/weather', (req, res) => {
    const cityName = req.body.cityName;
    res.send(cityName)
});

app.listen(3000, () => console.log('listen to port'));