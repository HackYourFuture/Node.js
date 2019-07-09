'use strict';
const fs = require('fs');
const readFile = require('./readAndAppend');
function writeToFile(string) {
  return new Promise((resolve, reject) =>
    fs.writeFile('./data.json', string, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    }),
  );
}
module.exports = writeToFile;
