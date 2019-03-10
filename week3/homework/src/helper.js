'use strict';

const api = require('./api');

const functions = {
  addToDo: (req, res) => {
    res.status(201);
    res.json(api.add(req.body.todo));
  },
  getAllToDos: (req, res) => {
    res.status(200);
    res.json(api.get());
  },
  getToDo: (req, res) => {
    res.status(200);
    res.json(api.getOne(req.params.id));
  },

  update: (req, res) => {
    res.status(200);
    res.json(api.update(req.params.id, req.body.todo));
  },
  markedAsDone: (req, res) => {
    res.json(api.done(req.params.id, req.body.done));
  },
  markedAsNotDone: (req, res) => {
    res.json(api.notDone(req.params.id, req.body.done));
  },
  removeToDo: (req, res) => {
    res.status(204);
    res.json(api.remove(req.params.id));
  },
  removeAll: (req, res) => {
    res.status(204);
    res.json(api.clear());
  },
};

// Routes
const express = require('express');
const api = require('./api');
const methods = require('./methods');
const router = express.Router();
router.post('/', methods.addToDo);
router.get('/', methods.getAllToDos);
router.get('/:id', methods.getToDo);
router.post('/:id', methods.update);
router.post('/:id/done', methods.markedAsDone);
router.delete('/:id/done', methods.markedAsNotDone);
router.delete('/:id', methods.removeToDo);
router.delete('/', methods.removeAll);

module.exports = { functions, router };
