const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

const app = express();

app.use(express.json());

function readFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function writeToFile(counters) {
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(counters), 'utf8', err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function validateCounter(request) {
  const { counter } = request.body;
  if (counter == null) throw Error('Add counter object in JSON format');
  if (counter.name == null) throw Error('Add name property of counter object in JSON format');
  return counter;
}

async function readCounters(req, res) {
  const counters = await readFromFile();
  res.send(counters);
}

async function readCounter(req, res) {
  const counters = await readFromFile();
  const counter = counters.find(counter => counter.id === req.params.id);
  res.send(counter);
}

async function createCounters(req, res) {
  const counter = {};
  const counters = await readFromFile();
  counter.id = uuid.v4();
  counters.push(counter);
  await writeToFile(counters);
  res.status = 201;
  res.end('New counter is added to the list');
}

async function updateCounter(req, res) {
  const updatedCounter = validateCounter(req);
  const counters = await readFromFile();
  const originalCounter = counters.find(counter => counter.id === req.params.id);
  originalCounter.name = updatedCounter.name;
  updatedCounter.name = req.body.counter.name;
  await writeToFile(counters);
  res.status = 201;
  res.end('Name is added to the counter');
}

app.get('/counters', (req, res) => {
  readCounters(req, res);
});
app.get('/counters/:id', (req, res) => {
  readCounter(req, res);
});
app.post('/counters', (req, res) => {
  createCounters(req, res);
});
app.put('/counters/:id', (req, res) => {
  updateCounter(req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => `Listening on port ${port}`);
