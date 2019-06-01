'use strict';

const requireFunc = require('./actions');

function getTodos(req, res) {
  res.status(200);
  res.json(requireFunc.get());
}

module.exports = getTodos;
