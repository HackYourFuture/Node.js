const express = require('express');
const api = require('./api');
const methods = require('./methods');

const router = express.Router();

router.get('/', methods.getAll);
router.get('/:id', methods.getOne);
router.post('/', methods.addTodo);
router.post('/:id', methods.updateTodo);
router.post('/:id/done', methods.done);
router.delete('/:id/done', methods.notDone);
router.delete('/:id', methods.removeTodo);
router.delete('/', methods.clearAll);

module.exports = router;
