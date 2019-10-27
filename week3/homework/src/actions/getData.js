'use strict';
const fs = require('fs')

function getData() {
    return new Promise((resolve, reject) => {
      fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }

  module.exports = getData;