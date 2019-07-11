const fs = require('fs');

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (error, data) => {
      if (error) {
        reject(console.error);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

module.exports = readFile;
