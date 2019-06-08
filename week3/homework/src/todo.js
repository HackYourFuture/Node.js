'use strict';

const fs = require('fs');

const ENCODING = 'utf8';

class Todo {
  constructor(filename) {
    this._filename = filename;
  }

  list() {
    return new Promise((resolve, reject) =>
      fs.readFile(this._filename, ENCODING, (err, todoList) => {
        if (err) {
          if (err.code === 'ENOENT') console.log('no data found');
          return reject(err);
        }
        return resolve(todoList);
      }),
    );
  }

  reset(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._filename, JSON.stringify(data), err => {
        if (err) return reject(err);
      });
      return resolve();
    });
  }
}

module.exports = Todo;
