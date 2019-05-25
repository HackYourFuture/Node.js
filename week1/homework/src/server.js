/* eslint-disable indent */
'use strict';

const http = require('http');

const createServer = () => {
  let state = 10;
  const server = http.createServer((req, res) => {
    const renderResponse = (statusCode, write) => {
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(write));
      res.end();
    };
    req.url === '/state'
      ? renderResponse(200, { state })
      : req.url === '/reset'
      ? (state = 10) && renderResponse(200, { state })
      : req.url === '/add'
      ? state++ && renderResponse(200, { state })
      : req.url === '/subtract'
      ? state-- && renderResponse(200, { state })
      : renderResponse(404, `{ "error": "Not found" }`);
  });

  return server;
};

module.exports = { createServer };
