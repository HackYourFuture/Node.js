'use strict';

const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const appendFilePromise = util.promisify(fs.appendFile);

class Methods {
  constructor(filePath, args) {
    this.args = args;
    this.filePath = filePath;
  }

  async list() {
    const todos = await this.getFileData(this.filePath);

    if (!todos) {
      return console.log(`There is no data in '${this.filePath}' file!`);
    }

    console.log(`------\nTodos:\n------`);
    todos
      .trim()
      .split('\n')
      .forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
      });
  }

  getFileData(filePath) {
    return readFilePromise(filePath, 'utf8');
  }

  write(data) {
    return writeFilePromise(this.filePath, data, 'utf8');
  }

  async add() {
    try {
      const todos = this.args.join('\n');
      await appendFilePromise(this.filePath, todos, 'utf8');
      console.log(`${this.args.length} todos added succesfully!`);
    } catch (error) {
      console.log(error);
    }
  }

  async update() {
    try {
      let todos = await this.getFileData(this.filePath);

      const line = Number(this.args[0]);
      const newTodo = this.args[1];
      const oldTodo = todos.split('\n')[line - 1];

      const todoList = todos.split('\n');
      todoList.splice(line - 1, 1, newTodo);
      const newTodos = todoList.join('\n');

      (async() => {
        try {
          await writeFilePromise(this.filePath, newTodos, 'utf8');
          console.log(`In line ${line} '${oldTodo}' is changed to '${newTodo}'`);
        } catch (error) {
          console.log(error);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }

  async remove() {
    /* eslint brace-style: 2 */
    try {
      const line = Number(this.args[0]);
      let todos = await this.getFileData(this.filePath);
      const todoList = todos.trim().split('\n');

      if (isNaN(line)) {
        return console.log(`'${line}' is not an expected number value!`);
      }

      if (line < 0) {
        return console.log("Line number can't be negative!");
      }

      if (todos.length === 0) {
        return console.log('The file is already empty!');
      }

      if (line > todoList.length) {
        return console.log(
          `You can't remove line '${line}'. Maximum line number is '${todoList.length}'`
        );
      }

      const removedTodo = todoList.splice(line - 1, 1);
      todos = `${todoList.join('\n')}\n`;

      (async() => {
        try {
          await writeFilePromise(this.filePath, todos, 'utf8');
          console.log(`'${line}. ${removedTodo}' has been succesfully removed.`);
        } catch (error) {
          console.log(error);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }

  async reset() {
    try {
      await this.write('');
      console.log(`Now, file ${this.filePath} is empty!`);
    } catch (error) {
      console.log(error);
    }
  }

  async help() {
    const helpText = await this.getFileData('./help.txt');
    console.log(helpText);
  }
}

module.exports = Methods;
