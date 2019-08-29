'use strict';

const fs = require('fs');

class Counters {
  constructor(file) {
    this.file = file;
  }

  static read(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data));
      });
    });
  }

  static write(file, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, JSON.stringify(data, null, 2), err => (err ? reject(err) : resolve()));
    });
  }
}

module.exports = Counters;
