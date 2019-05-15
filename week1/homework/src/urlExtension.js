/* eslint-disable */
module.exports = {
  myStateFunction: function(request, response, state) {
    function writeHeadAndStringify(code, value) {
      response.writeHead(code, { 'Content-Type': 'application/json' });
      typeof value === 'number'
        ? response.write(JSON.stringify({ state: value }))
        : response.write(JSON.stringify({ error: value }));
    }
    switch (request.url) {
      case '/state':
        writeHeadAndStringify(200, state);
        break;
      case '/add':
        state = ++state;
        writeHeadAndStringify(200, state);
        break;
      case '/subtract':
        state = --state;
        writeHeadAndStringify(200, state);
        break;
      case '/reset':
        state = 10;
        writeHeadAndStringify(200, state);
        break;
      default:
        const error = 'Not found';
        writeHeadAndStringify(404, error);
    }
    return state;
  },
};
