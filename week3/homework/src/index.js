'use strict';


const express = require('express');
const app = express();
const todos = require('./route/todos');
const morgan = require('morgan');
const port = 3000;

app.use(express.json());
app.use(
  morgan(
    '[:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms'
  )
);
app.use('/todos', todos);

app.listen(port, () => console.log(`http://localhost:${port}`));








/* const bodyParser = require('body-parser');

let users = [
  {
    id: 1,
    name: 'Shriyans',
    email: 'shriyansbhatnagar@gmail.com',
    age: 27,
  },
  {
    id: 2,
    name: 'Ahmet',
    email: 'ahmet@gmail.com',
    age: 29,
  },
 ];

 app.get('/', (req, res) => {
  // console.log(req.query);
   res.send('contact hi');
 });

app.get('/contact', (req, res) => {
 // console.log(req.query);
  res.send('contact hi sads');
});

/*app.get('/users', (req, res) => {
  res.send({ users });
}); 


app.listen(3000); */
