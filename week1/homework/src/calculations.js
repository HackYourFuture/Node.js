function calculator(url, response) {
  response.setHeader('Content-Type', 'text/html');
  let state = 10;
  switch (url) {
    case '/':
      response.statusCode = 404;
      response.write('Please add one of the following in the request-path:');
      response.write(' state-add-subtract-reset');
      break;
    case '/state':
      response.write('The current state is: ' + state);
      break;
    case '/add':
      state += 1;
      response.write('state: ' + state);
      break;
    case '/subtract':
      state -= 1;
      response.write('state: ' + state);
      break;
    case '/reset':
      state = 10;
      response.write('State reset to: ' + state);
      break;
    default:
      response.statusCode = 404;
      response.write('error: Not found');
  }

  response.end();
}
module.exports = {
  calculator,
};
