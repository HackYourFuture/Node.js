'use strict';

const fs = require('fs');
const ENCODING = 'utf8';

class Todo {
  constructor(filename) {
    this._filename = filename;
  }
  read() {
    return new Promise(resolve => {
      fs.readFile(this._filename, ENCODING, (error, data) => {
        if (error) return resolve([]);

        return resolve(JSON.parse(data));
      });
    });
  }

  _save(todos) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._filename, JSON.stringify(todos, null, 2), error =>
        error == null ? resolve() : reject(error),
      );
    });
  }

  readList() {
    return new Promise((resolve, reject) =>
      fs.readFile(this._filename, ENCODING, (err, todoList) => {
        if (err) {
          if (err.code === 'ENOENT') console.log('file not found');
          return reject(err);
        }
        return resolve(todoList);
      }),
    );
  }

  async delete_(id) {
    const todos = await this.read();
    const filteredTodos = todos.filter(t => t.id !== id);

    return this._save(filteredTodos);
  }
}

module.exports = Todo;
