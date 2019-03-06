'use strict';

const api = require('../api');

const getAllToDos = (req, res) => {
  res.status(200);
  res.json(api.get());
};

module.exports = getAllToDos;
