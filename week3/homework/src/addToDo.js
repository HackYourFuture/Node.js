const requireAddFunc = require('./actions');
function addToDo(req, res) {
  if (req.body.toDo === '' || req.body.toDo === null) {
    res.status(400);
    res.json(' name a to do');
  }
  // eslint-disable-next-line indent
  else {
    res.status(200);
    res.json(requireAddFunc.addToDo(req.body.todo));
  }
}

module.exports = addToDo;
