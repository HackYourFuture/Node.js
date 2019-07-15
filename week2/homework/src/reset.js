'use strict';

const fs = require('fs');

function resetTodo() {
  fs.writeFile('./todos-data.json', '[]', error => {
    if (error) return error;
  });
}

module.exports = {
  resetTodo,
};
