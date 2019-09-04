const fs = require('fs');
const DEFAULT_ENCODING = 'utf8';

class Util {
  constructor(filename) {
    this._filename = filename;
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this._filename, DEFAULT_ENCODING, (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }

  save(counters) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._filename, JSON.stringify(counters, null, 2), error =>
        error == null ? resolve() : reject(error)
      );
    });
  }
}

module.exports = Util;
