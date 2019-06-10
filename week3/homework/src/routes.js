'use strict';

const express = require('express');
const router = express.Router();
const getAllToDos = require('./getAllToDos');
const getOneToDo = require('./getOneToDo');
const addToDo = require('./addToDo');
const updateToDo = require('./updateToDo');
const markAsDone = require('./markAsDone');
const markAsNotDone = require('./markAsNotDone');
const removeToDo = require('./removeToDo');
const removeAllToDos = require('./removeAllToDos');

router.get('/', getAllToDos);
router.get('/:id', getOneToDo);
router.post('/', addToDo);
router.put('/:id', updateToDo);
router.post('/:id/:done', markAsDone);
router.delete('/:id/:done', markAsNotDone);
router.delete('/:id', removeToDo);
router.delete('/', removeAllToDos);

module.exports = router;
