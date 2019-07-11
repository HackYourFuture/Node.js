const fs = require('fs');

function writeToFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', data, (err, data) => {
      if (err) {
        reject(console.error);
      } else {
        resolve(data);
      }
    });
  });
}
module.exports = writeToFile;
