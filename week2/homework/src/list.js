const fs = require('fs');
const fileName = './src/data.json';

function list() {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
}
module.exports = list;
