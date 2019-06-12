const requireActions = require('./actions');
function getById(req, res) {
  if (requireActions.getItem(req.params.id)) {
    res.status(200);
    res.json(requireActions.getItem(req.params.id));
  }
  // eslint-disable-next-line indent
  else {
    res.status(400);
    res.json('name a value by id ');
  }
}
module.exports = getById;
