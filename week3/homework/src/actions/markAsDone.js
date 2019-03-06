'use strict';

const api = require('../api');
const errorMessage = 'Please define a valid id!';

const markAsDone = (req, res) => {
  if (api.getOne(req.params.id)) {
    res.status(206);
    res.json(
      (() => {
        api.done(req.params.id);
        return api.get();
      })()
    );
  } else {
    res.status(400);
    res.json(errorMessage);
  }
};

module.exports = markAsDone;
