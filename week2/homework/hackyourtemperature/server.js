const express = require('express'),
  exphbs = require('express-handlebars'),
  axios = require('axios'),
  router = require('./routes/weather');

const app = express();
//Body parser middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Handlebar middleware
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

//Router middleware
app.use(router)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));