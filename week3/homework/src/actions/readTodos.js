'use strict';

const fs = require('fs');
const path = '../todos.json';

function readTodos(req, res) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, todos) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(JSON.parse(todos));
      }
    });
  });
}

module.exports = readTodos;
