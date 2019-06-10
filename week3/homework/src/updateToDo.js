'use strict';

const api = require('./api');
const errorMessage = 'Please define a valid id!';

const updateToDo = (req, res) => {
  if (api.getOne(req.params.id)) {
    res.status(206);
    res.json(
      (() => {
        api.update(req.params.id, req.body.todo);
        return api.get();
      })(),
    );
  } else {
    res.status(400);
    res.json(errorMessage);
  }
};

module.exports = updateToDo;
