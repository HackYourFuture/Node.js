const render = (response, state, error = false) => {
  response.setHeader('Content-Type', 'application/json');
  error
    ? response.write(JSON.stringify({ error: 'Not found' }, null, 2))
    : response.write(JSON.stringify({ state: state }, null, 2));
};

module.exports = render;
