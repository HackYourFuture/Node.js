import express from 'express';
const app = express()
const port = 3000
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.setHeader('Content-Type', 'text/plane');
  res.send(`${cityName}`);
})
app.use('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('hello from backend to frontend!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})