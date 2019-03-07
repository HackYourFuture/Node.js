'use strict';
const api = require('./api');

const methods = {
  getAll: (req, res) => {
    res.status(200);
    res.json(api.get());
  },
  getOne: (req, res) => {
    res.status(200);
    res.json(api.getOne(req.params.id));
  },
  addTodo: (req, res) => {
    res.status(201);
    res.json(api.add(req.body.todo));
  },
  updateTodo: (req, res) => {
    res.status(200);
    res.json(api.update(req.params.id, req.body.todo));
  },
  done: (req, res) => {
    res.json(api.done(req.params.id, req.body.done));
  },
  notDone: (req, res) => {
    res.json(api.notDone(req.params.id, req.body.done));
  },
  removeTodo: (req, res) => {
    res.status(204);
    res.json(api.remove(req.params.id));
  },
  clearAll: (req, res) => {
    res.status(204);
    res.json(api.clear());
  },
};

module.exports = methods;
