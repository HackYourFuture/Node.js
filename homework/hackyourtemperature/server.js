const express = require('express'),
  exphbs = require('express-handlebars'),
  axios = require('axios'),
  router = require('./routes/weather'),
  path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

//Body parser middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Handlebar middleware
app.engine('handlebars', exphbs({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');

//Router middleware
app.use(router)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));