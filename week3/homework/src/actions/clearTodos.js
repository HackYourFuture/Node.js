'use strict';
const newFile = require('./newFile');

async function clearTodos(req, res) {
    await newFile({});
    res.status = 200;
    res.end('the list of to-dos is cleared');
  }

  module.exports = clearTodos;