
// Step 1: Setting up express and the other modules that we are going to use.
// Then making a server and making a 'GET' request to '/' and sending a simple
//  message to check that everything is working right.

import express from 'express';
import path from 'path'
const app = express()

// Body parser Middleware:
app.use(express.json())


app.get('/', (req, res) => {
 res.send('<h1>Hello from backend to frontend!!</h1>')
})



// Create a post route that has /weather as an endpoint:
app.post('/weather', (req, res) => {
    const cityName = req.body.cityName
  if (cityName) {
    res.send(cityName);
  } else {
    res.status(400).send('No city name');
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('Server is running'))

