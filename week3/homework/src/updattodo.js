const requireAddFunc = require('./actions');

function updateToDo(req, res) {
  if (requireAddFunc.getItem(req.params.id)) {
    res.status(200);
    res.json(requireAddFunc.updateToDo(req.params.id, req.body.todo));
    requireAddFunc.get();
  }
  // eslint-disable-next-line indent
  else {
    res.status(400);
    res.json('define a value for id');
  }
}
module.exports = updateToDo;
