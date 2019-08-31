'use strict';

const fs = require('fs').promises;
const path = require('path');
const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

const PORT = app.get('port');
const FILE = path.join(__dirname, process.env.FILE || 'counters.json');

const loadCounters = async () => {
  try {
    const counters = await fs.readFile(FILE, 'utf8');
    return JSON.parse(counters);
  } catch (e) {
    return [];
  }
};

const saveCounters = async counters => {
  try {
    return await fs.writeFile(FILE, JSON.stringify(counters));
  } catch (e) {
    return [];
  }
};

const listCounters = async () => {
  try {
    return await loadCounters();
  } catch (e) {
    throw new Error('Please, refresh the page!');
  }
};

const addCounter = async (id, state = 0) => {
  const counters = await loadCounters();
  counters.push({ id, state });
  saveCounters(counters);
  return { id };
};

const readCounter = async id => {
  const counters = await loadCounters();
  const counter = counters.find(counter => counter.id === id);
  if (!counter) {
    throw new Error('Counter is not found');
  }
  return counter;
};

const updateCounter = async id => {
  const counters = await loadCounters();
  const counter = counters.find(counter => counter.id === id);
  if (!counter) {
    throw new Error('Counter is not found');
  }
  ++counter.state;
  saveCounters(counters);
  return counter;
};

app
  .get('/counters', async (req, res) => {
    try {
      res.send(await listCounters());
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .get('/counters/:id', async (req, res) => {
    try {
      res.send(await readCounter(parseInt(new Number(req.params.id))));
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .post('/counters', async (req, res) => {
    const counters = await loadCounters();
    if (counters.length) {
      const id = counters[counters.length - 1].id;
      res.send(await addCounter(id + 1));
    } else res.send(await addCounter(1));
  })
  .put('/counters/:id', async (req, res) => {
    try {
      console.log(req.params.id);
      res.send(await updateCounter(parseInt(new Number(req.params.id))));
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .use((req, res, next) => {
    const err = new Error('Page Not Found!');
    res.status(404).send(err.message);
  })
  .listen(PORT, () => {
    console.log(`Server is activated on port ${PORT}.`);
  });
