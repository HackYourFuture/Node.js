'use strict';

const fs = require('fs');
const fileName = './src/data.json';

async function readTodos() {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, toDos) => {
      error ? reject(error) : resolve(toDos);
    });
  });
}
module.exports = readTodos;
