'use strict';

const fs = require('fs');

class Counters {
  constructor(file) {
    this.file = file;
  }

  static readCounters(file, encoding) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, encoding, (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data));
      });
    });
  }

  static writeCounters(file, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, JSON.stringify(data, null, 2), err => (err ? reject(err) : resolve()));
    });
  }
}

module.exports = Counters;
