'use strict';

const api = require('../api');

const addToDo = (req, res) => {
  if (req.body.todo === '' || req.body.todo === null) {
    res.status(400);
    res.json('Please define a todo!');
  } else {
    res.status(201);
    res.json(api.add(req.body.todo));
  }
};

module.exports = addToDo;
