'use strict'
const fs = require('fs')

function newFile(todos) {
    return new Promise((resolve, reject) => {
      fs.writeFile('todos.json', JSON.stringify(todos, null, 2), 'utf8', err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  module.exports = newFile;