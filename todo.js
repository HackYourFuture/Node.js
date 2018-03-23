'use strict';

let fs = require('fs');
const path = './data.json';

function writeFile(data) {
  return new Promise(
    (resolve, reject) => {
      fs.writeFile(path, `${JSON.stringify(data)}\n`, (err, data) => err ? reject(err) : resolve(data))
    });
}

function readFile() {
  return new Promise(
    (resolve, reject) => {
      fs.readFile(path, (err, data) => resolve(err ? [] : JSON.parse(data.toString())))
    })
}

module.exports = {
  readFile: readFile,
  writeFile: writeFile
};