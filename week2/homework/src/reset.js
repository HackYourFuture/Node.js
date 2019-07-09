'use strict';
const fs = require('fs');
function reset() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (error, data) => {
      if (error) {
        console.error;
      } else {
        data = '{}';
        resolve(data);
      }
    });
  });
}
module.exports = reset;
