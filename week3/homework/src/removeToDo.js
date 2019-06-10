'use strict';

const api = require('./api');
const errorMessage = 'Please define a valid id!';

const removeToDo = (req, res) => {
  if (api.getOne(req.params.id)) {
    res.status(200);
    res.json(
      (() => {
        api.remove(req.params.id);
        return api.get();
      })(),
    );
  } else {
    res.status(400);
    res.json(errorMessage);
  }
};

module.exports = removeToDo;
