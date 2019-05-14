module.exports = {
  myStateFunction: function(request, response, state) {
    if (request.url === `/state`) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state }));
    }
 else if (request.url === '/add') {
      state = ++state;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state: state }));
    }
 else if (request.url === '/subtract') {
      state = --state;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state: state }));
    }
 else if (request.url === '/reset') {
      state = 10;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state }));
    }
 else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      const error = 'Not found';
      response.write(JSON.stringify({ error }));
    }
    return state;
  }
};
