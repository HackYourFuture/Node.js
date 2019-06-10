'use strict';

const api = require('./api');

const removeAllToDos = (req, res) => {
  res.status(204);
  res.json(
    (() => {
      api.removeAll();
      return api.get();
    })(),
  );
};

module.exports = removeAllToDos;
