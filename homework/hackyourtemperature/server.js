import express, { application } from 'express';
import expressHandlebars from "express-handlebars";
import nodeFetch from "node-fetch";

const app = express();

app.get('/',(req, res) => {
    res.send('hello from backend to frontend!');
  });

app.use(express.json());


app.post('/weather',(req, res) => {
  const cityName = req.body.cityName
  res.send(`${cityName} was added`);
  });



app.listen(3000, () => {
    console.log('Server started on port 3000');
  });