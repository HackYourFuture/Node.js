'use strict';

// TODO: Write the homework code in this file
const Express = require('express');
const createTodo = require('nedb');
const TODO = require('./toDos');
const port = Number(process.env.port || 3000);

const db = new createTodo ({filename: 'toDos', autoload: true});
express ()
  .use (cors ())
  .get ('/', function (req, res) {
    res.redirect (302, 'https://github.com/HackYourFuture/nodejs.git');
  })
  .use ('/toDos', toDos (db))
  .listen (port);
console.log ('listening on ' + port);
