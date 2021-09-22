import express from 'express';
//import bodyParser from 'body-parser';

const app = express();
app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});
app.use(express.json());
//app.use(bodyParser.json());
app.post('/weather/:cityName', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify('cityName:' + req.params.cityName));
});
app.listen(3000, () => {
  console.log(`app is listening to port 3000`);
});
