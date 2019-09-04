'use strict';

const express = require('express');
const app = express();
const Api = require('./api');
const Validator = require('./validator');
const api = new Api();
const validator = new Validator();
// Use user validator middleware
app.use(validator.userValidator);
// Use built-in JSON middleware to automatically parse JSON
app.use(express.json());

app.get('/counters', api.readCounters);
app.post('/counters', validator.userValidator, api.createCounter);
app.put('/counters/:id', validator.userValidator, api.updateCounters);
app.get('/counters/:id', api.getSpecificCounter);
app.delete('/counters/:id', api.deleteCounter);

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Server started on http://localhost:${port}`);
});
