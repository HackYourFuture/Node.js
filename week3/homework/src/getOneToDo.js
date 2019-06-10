'use strict';

const api = require('./api');
const errorMessage = 'Please define a valid id!';

const getOneToDo = (req, res) => {
  if (api.getOne(req.params.id)) {
    res.status(206);
    res.json(api.getOne(req.params.id));
  } else {
    res.status(400);
    res.json(errorMessage);
  }
};

module.exports = getOneToDo;
