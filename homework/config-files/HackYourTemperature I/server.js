const express = require('express');
const server = express ();
const PORT = 3000;


server.get ('/', (req, res) => {
  res.send ('hello from backend to frontend!')
})

server.listen(PORT)


