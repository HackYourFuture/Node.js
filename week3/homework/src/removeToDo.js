const requireActions = require('./actions');
function removeToDo(req, res) {
  if (requireActions.getItem(req.params.id)) {
    res.status(200);
    res.json(
      (() => {
        requireActions.removeToDo(req.params.id);
        return requireActions.get();
      })()
    );
  }
  // eslint-disable-next-line indent
  else {
    res.status(400);
    res.json('define a value of the id ');
  }
}
module.exports = removeToDo;
