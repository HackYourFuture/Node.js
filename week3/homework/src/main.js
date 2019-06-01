'use strict';

const { add, get, getOne, done, notDone, update, remove, removeAll } = require('./actions');
const error = 'Please use a valid method and a valid url!';

const main = (req, res) => {
  const task = req.body.task;
  const id = req.params.id;
  const url = req.route.path;
  const method = req.method;
  url === '/' && method === 'POST'
    ? res.status(201) && res.json(add(task))
    : url === '/' && method === 'GET'
    ? res.status(200) && res.json(get())
    : url === '/:id' && method === 'GET'
    ? res.status(206) && res.json(getOne(id))
    : url === '/:id/:done' && method === 'POST'
    ? res.status(206) && res.json(done(id))
    : url === '/:id/:done' && method === 'DELETE'
    ? res.status(206) && res.json(notDone(id))
    : url === '/' && method === 'DELETE'
    ? res.status(204) && res.json(removeAll())
    : url === '/:id' && method === 'DELETE'
    ? res.status(200) && res.json(remove(id) && get())
    : url === '/:id' && method === 'PUT'
    ? res.status(206) && res.json(update(id, task))
    : res.status(400) && res.json(error);
};

module.exports = main;
