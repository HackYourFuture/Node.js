function setTrue(action, request, response) {
  action.update(request, response, true);
}

function setFalse(action, request, response) {
  action.update(request, response, false);
}

module.exports.setTrue = setTrue;
module.exports.setFalse = setFalse;
