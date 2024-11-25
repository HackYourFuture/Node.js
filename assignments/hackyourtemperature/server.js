import express from "express";

// import express-handlebars from "express-handlebars";
// import node-fetch from 'node-fetch';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from backend to frontend!')
})

app.use(express.json())

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    return res.status(400).json({ error: "Oops..." });
  }
  
  res.status(200).json({
    message: `The city name is: ${cityName}`,
  });
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})