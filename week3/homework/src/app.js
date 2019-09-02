'use strict';

//  handling endpoints/routing with express

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.status(200).json({ testExpress: 'Express is working!' });
});

app.post('/todos', (req, res, next) => {
  res.status(200).json({ testExpress: 'POST method: Express handler.' });
});

app.get('/todos', (req, res, next) => {
  res.status(200).json({ testExpress: 'Get method: Express handler.' });
});

app.put('/todos/:id', (req, res, next) => {
  res.status(200).json({
    testExpress: 'Put method: Express handler.',
    id: req.params.id
  });
});

app.delete('/todos/:id', (req, res, next) => {
  res.status(200).json({
    testExpress: 'Delete method: Express handler.',
    id: req.params.id
  });
});

module.exports = app;
