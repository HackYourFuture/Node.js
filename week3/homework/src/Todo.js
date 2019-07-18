'use strict';

const uuidv4 = require('uuid/v4');
const util = require('util');
const fs = require('fs');

const readPromise = util.promisify(fs.readFile);
const writePromise = util.promisify(fs.writeFile);


const DEFAULT_ENCODING = 'utf8';

class Todo {
  constructor(filename) {
    this.filename = filename;
  }

  async read(id = undefined) {
    const todos = JSON.parse(await readPromise(this.filename, DEFAULT_ENCODING));

    // If Id has not been provided then return all todos
    if (id === undefined) return todos;

    const todo = todos.find(t => t.id === id);
    if (todo === undefined) this._errorHandler(`To-do with ID '${id}' does not exist`, 404);

    return todo;
  }

  async createSave(text) {
    const todos = await this.read();

    const todo = {
      id: uuidv4(),
      done: false,
      text
    };

    todos.push(todo);
    await this._save(todos);

    return todo;
  }

  async update(id, text) {
    const todos = await this.read();
    const todo = todos.find(t => t.id === id);

    if (todo === undefined) this._errorHandler(`To-do with ID '${id}' does not exist`, 404);

    todo.text = text;
    await this._save(todos);

    return todo;
  }

  async delete(id) {
    const todos = await this.read();

    // Clear Todos
    if (id === undefined || id == null) {
      return this._save([]);
    }

    const filteredTodos = todos.filter(t => t.id !== id);

    if (filteredTodos.length === todos.length)
      this._errorHandler(`To-do with ID '${id}' does not exist`, 404);

    return this._save(filteredTodos);
  }

  async mark(id, isDone) {
    const todos = await this.read();
    const todo = todos.find(t => t.id === id);

    if (todo === undefined) this._errorHandler(`To-do with ID '${id}' does not exist`, 404);

    if (isDone) todo.done = true;
    else todo.done = false;

    return this._save(todos);
  }

  _save(todos) {
    return writePromise(this.filename, JSON.stringify(todos, null, 2));
  }

  _errorHandler(message, code) {
    const error = new Error(message);
    error.code = code;
    throw error;
  }
}

module.exports = Todo;
