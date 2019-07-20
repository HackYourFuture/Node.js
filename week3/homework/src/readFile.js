const fs = require('fs');
function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./todos.json', 'utf8', (error, todos) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(todos));
      }
    });
  });
}
module.exports = readFile;
