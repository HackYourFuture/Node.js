'use strict';

const sendState = (response, state) => {
  response.setHeader('Content-Type', 'application/json', 'charset = utf-8');
  response.write(JSON.stringify({ state }));
};

module.exports = sendState;
