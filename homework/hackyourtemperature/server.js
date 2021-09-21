//Set up your web server using Express (creating an Express instance, listen to port 3000)
//Make a GET request to / that sends the message hello from backend to frontend! to the client
//After writing all this code you can verify that it's working by running node server.js from the Command Line and checking your browser at http://localhost:3000.
//The page should display the message hello from backend to frontend!.

import express from 'express';

// Init express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Create your endpoints/route handlers
app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  res.send(`City: ${req.body.city}`);
});

// Listen on a port
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
