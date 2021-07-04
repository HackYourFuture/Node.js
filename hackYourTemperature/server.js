const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.listen(PORT);
