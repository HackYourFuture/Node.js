const fs = require('fs');
const express = require('express');
const app = express();
const path = './counterList.json';

function readDataFromFile(filePath) {
  const content = fs.readFileSync(filePath);
  return JSON.parse(content).counters;
}

app.get('/', (req, res) => {
  const data = readDataFromFile(path);
  const list = data.map(element => `counter${element.id}. ${element.count} \n`).toString();
  res.write(list);
  res.end();
});


//  todo: port  to set env.var $set PORT = ... || mac export
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))