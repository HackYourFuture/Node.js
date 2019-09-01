'use strict';

const express = require('express');
const uuid = require('uuid');
const app = express();
const util = require('./util');

app.use(express.json());

// get all the list
async function readCounters(req, res) {
  let counters = await util.readCountersFromFile();
  res.send(counters);
}

// create a new counter

async function createCounter(req, res) {
  const { error } = util.validateCounter(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const counters = await util.readCountersFromFile();
  const counter = {
    name: req.body.name,
    id: uuid.v4(),
  };
  counters.push(counter);
  await util.saveCounters(counters);
  res.status = 201;
  res.end();
}

// update counters

async function updateCounters(req, res) {
  const { error } = util.validateCounter(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let counters = await util.readCountersFromFile();
  const counter = counters.find(counter => counter.id === req.params.id);
  if (!counter) return res.status(404).send('The counter with the given Id was not Found!');
  counter.name = req.body.name;
  await util.saveCounters(counter);
  res.status = 201;
  res.end();
}
// get counter
async function getSpecificCounter(req, res) {
  let counters = await util.readCountersFromFile();
  const counter = counters.find(counter => counter.id === req.params.id);
  if (!counter) return res.status(404).send('The counter with the given Id was not Found!');
  res.send(counter);
}

// delete counter

async function deleteCounter(req, res) {
  let counters = await util.readCountersFromFile();
  const counter = counters.find(counter => counter.id === req.params.id);
  const index = counters.indexOf(counter);
  counters.splice(index, 1);
  await util.saveCounters(counters);
  res.status = 201;
  res.end();
}

app.get('/counters', (req, res) => {
  readCounters(req, res);
});

app.post('/counters', (req, res) => {
  createCounter(req, res);
});

app.put('/counters/:id', (req, res) => {
  updateCounters(req, res);
});

app.get('/counters/:id', (req, res) => {
  getSpecificCounter(req, res);
});

app.delete('/counters/:id', (req, res) => {
  deleteCounter(req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});
