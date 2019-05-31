const updatesFunction = {
  setTrue: (action, request, response) => {
    action.update(request, response, true);
  },

  setFalse: (action, request, response) => {
    action.update(request, response, false);
  },
};

const { setTrue, setFalse } = updatesFunction;
module.exports = { setTrue, setFalse };
