'use strict';

const requireFunc = require('./actions');

const reset = (req, res) => {
  res.status(204);
  res.json(requireFunc.removeAll() && requireFunc.get());
};

module.exports = reset;
