// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello From Backend To Frontend!');

// });

// app.listen(port, () => {
//   console.log(`Server Is Listening On Port ${port}`);
// });

import express  from 'express';

const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello From Backend To Frontend!');
});

app.post('/weather', (req, res) => {

  const cityName = req.body.cityName;
  if(!cityName) {
    res.status(400).send('City Name Is Required.');
  } else {
  res.send(`You Submitted: ${cityName}`);
  }
});

app.listen(port, () => {
  console.log(`Server Is Listening On Port ${port}`);
});

