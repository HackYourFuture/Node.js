'use strict';

const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);

const PORT = app.get('port');
const FILE = path.join(__dirname, process.env.FILE || 'counters.json');

const loadCounters = async () => {
  try {
    const counters = await fs.readFile(FILE, 'utf8');
    return JSON.parse(counters);
  } catch (err) {
    return [];
  }
};

const saveCounters = async counters => {
  try {
    return await fs.writeFile(FILE, JSON.stringify(counters));
  } catch (err) {
    console.log(err);
  }
};
// This function might be not needed
const listCounters = async () => {
  return await loadCounters();
};

const addCounter = async (id, state = 0) => {
  const counters = await loadCounters();
  counters.push({ id, state });
  saveCounters(counters);
  return { id };
};

const readCounter = async id => {
  const counters = await loadCounters();
  return counters.find(counter => counter.id === id);
};

const updateCounter = async id => {
  const counters = await loadCounters();
  const counter = counters.find(counter => counter.id === id);
  if (counter) ++counter.state;
  saveCounters(counters);
  return counter;
};

app
  .get('/counters', async (req, res) => {
    res.send(await listCounters());
  })
  .get('/counters/:id', async (req, res) => {
    res.send(await readCounter(parseInt(req.params.id)));
  })
  // The post request coming from postman in the body as a JSON. e.g {"id":90 }
  .post('/counters', async (req, res) => {
    res.send(await addCounter(parseInt(req.body.id)));
  })
  // increments the state of the counter
  .put('/counters/:id', async (req, res) => {
    res.send(await updateCounter(parseInt(req.params.id)));
  })
  .listen(PORT, () => {
    console.log(`Server is activated on port ${PORT}.`);
  });
