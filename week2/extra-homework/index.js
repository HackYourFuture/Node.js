'use strict';

const fs = require('fs');
const express = require('express');
const Counters = require('./counters');
const config = require('./config');
const port = process.env.PORT || 3000;
const app = express();

const COUNTERS_FILE = process.argv[2] || config.COUNTERS_FILE;
//* Create new Counters JSON File if doesn't exist
fs.stat(COUNTERS_FILE, err => {
  if (err && err.code === 'ENOENT') {
    console.log(`Counter file ${COUNTERS_FILE} does not exist`);
    fs.appendFile(COUNTERS_FILE, JSON.stringify([]), err => console.log(err.message));
  }
});
//* Logging Middleware function
function logRequest(req, res, next) {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

app.use(logRequest);

app.get('/counters', (req, res) => {
  res.sendFile(COUNTERS_FILE, error => {
    if (error) console.log(error);
  });
});

app.get('/counters/:id', async (req, res) => {
  try {
    const counters = await Counters.readCounters(COUNTERS_FILE, config.ENCODING);
    const counter = counters.find(counter => counter.id == +req.params.id);
    if (!counter) return res.status(404).json({ error: `${req.params.id} is not a valid id` });
    return res.json(counter);
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/counters', async (req, res) => {
  try {
    const counters = await Counters.readCounters(COUNTERS_FILE, config.ENCODING);
    const id = Number(Math.max(...counters.map(counter => counter.id))) + 1;
    newCounter = { id, value: 0 };
    counters.push(newCounter);
    await Counters.writeCounters(COUNTERS_FILE, counters);
    return res.json(newCounter);
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/counters/:id', async (req, res) => {
  try {
    const counters = await Counters.readCounters(COUNTERS_FILE, config.ENCODING);
    const counter = counters.find(counter => counter.id == +req.params.id);
    if (!counter) return res.status(404).json({ error: `${req.params.id} is not a valid id` });
    counter.value++;
    await Counters.writeCounters(COUNTERS_FILE, counters);
    res.json(counter);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}/`));
