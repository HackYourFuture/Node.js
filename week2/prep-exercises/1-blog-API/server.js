const express = require('express')
const app = express();
 

// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)