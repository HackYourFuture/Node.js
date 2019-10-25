'use strict';
{
  const fs = require('fs');

  const DEFAULT_ENCODING = 'utf8';

  class Todo {
    constructor(filename) {
      this._filename = filename;
    }

    read() {
      return new Promise(resolve => {
        fs.readFile(this._filename, DEFAULT_ENCODING, (error, data) => {
          if (error) return resolve([]);

          return resolve(JSON.parse(data));
        });
      });
    }

    async readTodo(id) {
      const todos = await this.read();

      const todo = todos.find(t => t.id === id);

      if (todo === null || todo === undefined) {
        const error = new Error(`To-do with ID: ${id} does not exist`);
        error.code = 'not-found';
        throw error;
      }

      return todo;
    }

    async markTodo(id, done) {
      const todos = await this.read();

      const todo = todos.find(t => t.id === id);
      if (todo === null) {
        const error = new Error(`To-do with ID: ${id} does not exist`);
        error.code = 'not-found';
        throw error;
      }

      todo.done = done;

      await this._save(todos);

      return todo;
    }

    deleteTodos() {
      const todos = [];
      return this._save(todos);
    }

    // Methods starting with underscore should not be used outside of this class
    _save(todos) {
      return new Promise((resolve, reject) => {
        fs.writeFile(this._filename, JSON.stringify(todos, null, 2), error =>
          error === null ? resolve() : reject(error),
        );
      });
    }
  }

  module.exports = Todo;
}
