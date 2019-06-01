/* eslint-disable indent */
'use strict';

const requireFunc = require('./actions');

function markAsDone(req, res) {
  if (requireFunc.getItem(req.params.id)) {
    res.status(206);
    res.json(requireFunc.done(req.params.id) && requireFunc.get());
  }
 else {
    res.status(400);
    res.json('Please define a valid id!');
  }
}

module.exports = markAsDone;
