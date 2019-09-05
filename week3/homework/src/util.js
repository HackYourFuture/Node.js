const fs = require('fs');
const DEFAULT_ENCODING = 'utf8';

class Util {
  constructor(filename) {
    this._filename = filename;
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this._filename, DEFAULT_ENCODING, (error, data) => {
        error == null ? resolve(JSON.parse(data)) : reject(error);
      });
    });
  }

  save(todos) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._filename, JSON.stringify(todos, null, 2), error =>
        error == null ? resolve() : reject(error),
      );
    });
  }
}

module.exports = Util;
