'use strict';

//  routing with express

const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
  res.status(200).json({ testExpress: 'Express is working!' });
});

module.exports = app;
