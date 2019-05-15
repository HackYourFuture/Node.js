/* eslint-disable */
module.exports = {
  myStateFunction: function(request, response, state) {
    function writeHeadAndStringify(code, value) {
      response.writeHead(code, { 'Content-Type': 'application/json' });
      if (typeof value === 'number') {
        response.write(JSON.stringify({ state: value }));
      } else {
        response.write(JSON.stringify({ error: value }));
      }
    }
    if (request.url === `/state`) {
      writeHeadAndStringify(200, state);
    } else if (request.url === '/add') {
      state = ++state;
      writeHeadAndStringify(200, state);
    } else if (request.url === '/subtract') {
      state = --state;
      writeHeadAndStringify(200, state);
    } else if (request.url === '/reset') {
      state = 10;
      writeHeadAndStringify(200, state);
    } else {
      const error = 'Not found';
      writeHeadAndStringify(404, error);
    }
    return state;
  },
};
