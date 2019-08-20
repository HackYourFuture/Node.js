const express = require('express');
const fs = require('fs');
const config = require('./config');
const port = process.env.PORT || 3000;
const app = express();
const COUNTER_FILE = process.argv[2] || config.COUNTER_FILE;

function readCounters(file, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, encoding, (err, data) => {
      err ? reject(err) : resolve(JSON.parse(data));
    });
  });
}

function writeCounters(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), err => (err ? reject(err) : resolve()));
  });
}

fs.stat(COUNTER_FILE, err => {
  if (err && err.code === 'ENOENT') {
    console.log(`Counter file ${COUNTER_FILE} does not exist`);
    fs.appendFile(COUNTER_FILE, JSON.stringify([]), err => console.log(err.message));
  }
});

function logRequest(req, res, next) {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

app.use(logRequest);

app.get('/counters', (req, res) => {
  res.sendFile(COUNTER_FILE, error => {
    if (error) console.log(error);
  });
});

app.get('/counters/:id', (req, res) => {
  readCounters(COUNTER_FILE, config.ENCODING)
    .then(counters => {
      const counter = counters.find(counter => counter.id == +req.params.id);
      if (!counter) return res.status(404).json({ error: `${req.params.id} is not a valid ID` });
      res.json(counter);
    })
    .catch(error => console.log(error.message));
});

app.post('/counters', (req, res) => {
  readCounters(COUNTER_FILE, config.ENCODING)
    .then(counters => {
      const id = Number(Math.max(...counters.map(counter => counter.id))) + 1;
      newCounter = { id, value: 0 };
      counters.push(newCounter);
      writeCounters(COUNTER_FILE, counters);
      res.json(newCounter);
    })
    .catch(error => console.log(error.message));
});

app.post('/counters/:id', (req, res) => {
  readCounters(COUNTER_FILE, config.ENCODING)
    .then(counters => {
      const counter = counters.find(counter => counter.id == +req.params.id);
      if (!counter) return res.status(404).json({ error: `${req.params.id} is not a valid ID` });
      counter.value++;
      writeCounters(COUNTER_FILE, counters);
      res.json(counter);
    })
    .catch(error => console.log(error.message));
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}/`));
