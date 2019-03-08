const express = require('express');
const api = require('./api');
const router = express.Router();

// ROUTES
const getAll = (req, res) => res.json(api.get(req.params));
const getOne = (req, res) => res.json(api.getOne(req.params.id));
const add = (req, res) => res.json(api.add(req.body.todo));
const patch = (req, res) => res.json(api.update(req.params.id, req.body.todo));
const done = (req, res) => res.json(api.done(req.params.id, req.params.done));
const notDone = (req, res) => res.json(api.notDone(req.params.id, req.params.done));
const delet = (req, res) => res.json(api.remove(req.params.id));
const deletAll = (req, res) => res.json(api.removeAll(req.params));

// EXPRESS
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', add);
router.put('/:id', patch);
router.post('/:id/done', done);
router.delete('/:id/notDone', notDone);
router.delete('/:id', delet);
router.delete('/', deletAll);

module.exports = router;
