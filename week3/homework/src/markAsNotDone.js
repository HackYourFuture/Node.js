/* eslint-disable indent */
const requireFunc = require('./actions');

const markAsNotDone = (req, res) => {
  if (requireFunc.getItem(req.params.id)) {
    res.status(200);
    res.json(requireFunc.notDone(req.params.id) && requireFunc.get());
  }
 else {
    res.status(400);
    res.json('Please define a valid id!');
  }
};

module.exports = markAsNotDone;
