const express = require('express');
const router = express.Router();
const Todos = require('../lib');

const todos = new Todos('./todos.json');

router.get('/', (req, res) => todos.readTodos(req, res));
router.get('/:id', (req, res) => todos.readTodos(req, res));
router.post('/', (req, res) => todos.createTodos(req, res));
router.post('/:id/done', (req, res) => todos.markAsDone(req, res));
router.put('/:id', (req, res) => todos.updateTodos(req, res));
router.delete('/', (req, res) => todos.deleteTodos(req, res));
router.delete('/:id', (req, res) => todos.deleteTodo(req, res));
router.delete('/:id/done', (req, res) => todos.markAsNotDone(req, res));

module.exports = router;
