function calculator(url, code, response) {
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = code;
  let state = 10;
  if (url === '/') {
    response.write('Please add one of the following in the request-path:');
    response.write(' state-add-subtract-reset');
  } else if (url === '/state') {
    response.write('The current state is: ' + state);
  } else if (url === '/add') {
    state += 1;
    response.write('state: ' + state);
  } else if (url === '/subtract') {
    state -= 1;
    response.write('state: ' + state);
  } else if (url === '/reset') {
    state = 10;
    response.write('State reset to: ' + state);
  } else {
    response.write('error: Not found');
  }
  response.end();
}
module.exports = {
  calculator,
};
