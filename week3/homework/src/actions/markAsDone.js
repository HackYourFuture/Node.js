'use strict';
const getData = require('./getData');
const newFile = require('./newFile')

async function markAsDone(req, res) {
    const todos = await getData();
    const todo = todos.find(TODO => TODO.id === req.params.id);
    todo.done = true;
    await newFile(todos);
    res.status = 201;
    res.end('done');
  }

  module.exports = markAsDone;