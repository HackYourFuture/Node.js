'use strict';
// I know, that I still need to make a file and save data as a JSON format,
// to save the latest update. Honestly, I tried to work with the file system, readFile, and writeFile.
// I tried a lot but it didn't work.
// I have such a difficult time wrapping my head around file system.
// But at least I succeeded how to make simple HTTP protocol principles to provide support to:
// 1- create
// 2- read
// 3- Update
// 4- delete
// you can test them on postman, I think they will work just fine
// any advice will be highly appreciated!
const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());
const counters = [{ id: 1, name: 'counter' }];
app.get('/', (req, res) => {
  res.send('Hello!');
});
app.get('/api/counters', (req, res) => {
  res.send(counters);
});

app.get('/api/counters/:id', (req, res) => {
  const counter = counters.find(counter => counter.id === parseInt(req.params.id));
  if (!counter) return res.status(404).send('The counter with the given Id was not Found!');
  res.send(counter);
});

app.post('/api/counters', (req, res) => {
  const { error } = validateCounter(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const counter = {
    id: counters.length + 1,
    name: req.body.name,
  };
  counters.push(counter);
  res.send(counter);
});

app.put('/api/counters/:id', (req, res) => {
  const counter = counters.find(counter => counter.id === parseInt(req.params.id));
  if (!counter) return res.status(404).send('The counter with the given Id was not Found!');
  const { error } = validateCounter(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  counter.name = req.body.name;
  res.send(counter);
});

app.delete('/api/counters/:id', (req, res) => {
  const counter = counters.find(counter => counter.id === parseInt(req.params.id));
  if (!counter) return res.status(404).send('The counter with the given Id was not Found!');
  const index = counters.indexOf(counter);
  counters.splice(index, 1);
  res.send(counter);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});

function validateCounter(counter) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  };
  return Joi.validate(counter, schema);
}
