'use strict';

const express = require('express');
const router = express.Router();
const getTodos = require('./getTodos');
const markAsDone = require('./markAsDone');
const markAsNotDone = require('./markAsNotDone');
const reset = require('./reset');
const addToDo = require('./addToDo');
const getById = require('./getById');
const removeToDo = require('./removeToDo');
const updateToDo = require('./updattodo');
router.post('/', addToDo);
router.get('/:id', getById);
router.delete('/:id', removeToDo);
router.put('/:id', updateToDo);
router.get('/', getTodos);
router.post('/:id/:done', markAsDone);
router.delete('/:id/:done', markAsNotDone);
router.delete('/', reset);

module.exports = router;
