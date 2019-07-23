const fs = require('fs');

function read(req, res) {
  return new Promise((resolve, reject) => {
    fs.readFile('./toDo.json', 'utf8', (error, parsedData) => {
      if (error) {
        reject(error);
      }
 else {
        resolve(JSON.parse(parsedData));
      }
    });
  });
}

module.exports = read;
