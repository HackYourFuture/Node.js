'use strict';
const getTodos = require('./reader');
const saveTodos = require('./writer');

class ListManager {
  constructor (path) {
    this.dataPath = path;
    this.lastTodoID = 0;
  }

  async prepare () {
    try {
      if (this.dataPath === undefined || this.dataPath === null) {
        this.dataPath = './todos.json';
      }
      this.todos = await getTodos(this.dataPath);
      if (this.todos) {
        this.lastTodoID = this.todos.length > 0 ? this.todos[this.todos.length - 1].id : 0;
        return true; // Tells that preparing is successful
      } else {
        this.todos = [];
        if (!(await saveTodos(this.dataPath, this.todos))) {
          throw new Error(
            'There is a fatal error that prevent program from preparing the todo data file!'
          );
        } else {
          this.lastTodoID = 0;
          return true;
        }
      }
    } catch (error) {
      // This is a real error that we can not keep on running
      console.error(`Error occurred while trying to prepare todos data file.
      Error: ${error.message}
      Program will end.`);
      this.todos = null;
      return false; // Tells that preparing did not go well
    }
  }

  async listTodos () {
    if (this.isPrepared()) {
      try {
        this.todos = await getTodos(this.dataPath);
        if (this.todos.length > 0) {
          this.todos.forEach(todo => {
            console.log(`Todo Item: ${todo.id}, ${todo.title}`);
          });
        } else {
          console.log('There are no todos yet.');
        }
      } catch (error) {
        console.log(`Todos could not be fetched. Error: ${error.message}`);
      }
    }
  }

  async addTodo (title) {
    if (this.isPrepared()) {
      this.todos.push({ id: ++this.lastTodoID, title });
      try {
        await saveTodos(this.dataPath, this.todos);
        console.log('New Todo item successfully added to the list.');
      } catch (error) {
        console.error(`Error occurred while trying to save the list.
        Error: ${error.message}`);
        this.lastTodoID--;
      }
    }
  }

  async removeTodo (id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      console.error(`${id} is not a number. \
      Please provide a number that might match with a todo item for remove operation.`);
      return;
    }
    if (this.isPrepared()) {
      const filteredTodos = this.todos.filter(todo => todo.id !== parsedId);
      if (filteredTodos.length === this.todos.length) {
        console.warn(`Could not find a todo item with id ${id}!`);
        return;
      }
      this.todos = filteredTodos;
      try {
        await saveTodos(this.dataPath, this.todos);
        console.log(`Todo item with id ${id} successfully removed from the list.`);
      } catch (error) {
        console.error(`Error occurred while trying to save the list.
        Error: ${error.message}`);
      }
    }
  }

  async updateTodo (id, title) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      console.error(`${id} is not a number. \
      Please provide a number that might match with a todo item for update operation.`);
      return;
    }
    if (this.isPrepared()) {
      const todoToUpdate = this.todos.find(todo => todo.id === parsedId);
      if (todoToUpdate) {
        todoToUpdate.title = title;
        try {
          await saveTodos(this.dataPath, this.todos);
          console.log(`Todo item with id ${id} successfully updated.`);
        } catch (error) {
          console.error(`Error occurred while trying to save the list.
          Error: ${error.message}`);
        }
      } else {
        console.warn(`Could not find a todo item with id ${id}!`);
      }
    }
  }

  async resetTodos () {
    if (this.isPrepared()) {
      this.todos = [];
      try {
        await saveTodos(this.dataPath, this.todos);
        console.log(`Reset operation have been done successfully.`);
      } catch (error) {
        console.error(`Error occurred while trying to save the list.
        Error: ${error.message}`);
      }
    }
  }

  isPrepared () {
    if (this.todos) {
      return true;
    } else {
      console.error(`Could not proceed, ListManager is not prepared!`);
      return false;
    }
  }
}

module.exports = ListManager;
