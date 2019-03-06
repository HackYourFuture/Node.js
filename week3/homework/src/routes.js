'use strict';

const express = require('express');
const router = express.Router();
const getAllToDos = require('./actions/getAllToDos');
const getOneToDo = require('./actions/getOneToDo');
const addToDo = require('./actions/addToDo');
const updateToDo = require('./actions/updateToDo');
const markAsDone = require('./actions/markAsDone');
const markAsNotDone = require('./actions/markAsNotDone');
const removeToDo = require('./actions/removeToDo');
const removeAllToDos = require('./actions/removeAllToDos');

router.get('/', getAllToDos);
router.get('/:id', getOneToDo);
router.post('/', addToDo);
router.put('/:id', updateToDo);
router.post('/:id/:done', markAsDone);
router.delete('/:id/:done', markAsNotDone);
router.delete('/:id', removeToDo);
router.delete('/', removeAllToDos);

module.exports = router;
