const fs = require('fs');
const fileName = './src/data.json';

function list() {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, toDos) => {
      error ? reject(error) : resolve(toDos);
    });
  });
}
module.exports = list;
