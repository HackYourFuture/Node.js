/* eslint-disable indent */
'use strict';

const http = require('http');

const createServer = () => {
  let state = 10;
  const server = http.createServer((req, res) => {
    const RenderResponse = (statusCode, write) => {
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.write(write);
      res.end();
    };
    req.url === '/state'
      ? RenderResponse(200, JSON.stringify({ state }))
      : req.url === '/reset'
      ? (state = 10) && RenderResponse(200, JSON.stringify({ state }))
      : req.url === '/add'
      ? state++ && RenderResponse(200, JSON.stringify({ state }))
      : req.url === '/subtract'
      ? state-- && RenderResponse(200, JSON.stringify({ state }))
      : RenderResponse(404, `{ "error": "Not found" }`);
  });

  return server;
};

module.exports = { createServer };
