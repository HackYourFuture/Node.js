const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./Routers/app');

const app = express();

//handlebars Middleware
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

//Body parser middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(router)
// app.get('/', (req, res) => res.render('index'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`The server is running on Port ${PORT}`));