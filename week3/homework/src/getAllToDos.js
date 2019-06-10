'use strict';

const api = require('./api');
const errorMessage = 'Please define a valid method!';
const getAllToDos = (req, res) => {
  api.get() ? res.status(200) && res.json(api.get()) : res.status(400) && res.json(errorMessage);
};

module.exports = getAllToDos;
