'use strict';

const fs = require('fs');
const fileName = './src/data.json';

function clearTodos() {
  return fs.writeFile(fileName, '[]', error => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = clearTodos;
