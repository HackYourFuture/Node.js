'use strict';

const Todo = require('./todo');
const util = require('./util');

class TodoActions {
  async readToDo(req, res) {
    const todo = util.todos.find(todo => todo.id === req.params.id);
    if (todo)
      res.status(200).json({ message: 'Todo found', todos: todo });
    else
      res.status(404).json({ message: 'Todo is not found' });
  }

  async readToDos(req, res) {
    res.status(200).json({ message: 'TODO LIST', todos: util.todos });
  }

  async createToDo(req, res) {
    try {
      console.log(req.body);
      if (req.body.description.trim()) {
        util.todos.push(new Todo(req.body.description));
        await util.saveTodos(util.todos);
        res.status(200).json({ message: 'Todo is created successfully' });
      }
      else {
        res.status(400).json({ message: 'Description is empty!' });
      }
    }
    catch (e) {
      res.status(400).json({ message: 'Type (description) correctly' });
    }
  }

  async markToDo(req, res) {
    const index = util.todos.findIndex(todo => todo.id === req.params.id);
    const markType = req.method === 'POST';
    const msg = req.method === 'POST' ? 'completed' : 'uncompleted';
    if (index > -1) {
      util.todos[index].isCompleted = markType;
      res.status(200).json({ message: `Todo is signed as ${msg}` });
      await util.saveTodos(util.todos);
    }
    else {
      res.status(404).json({ message: 'Todo is not found' });
    }
  }

  async updateTodo(req, res) {
    const index = util.todos.findIndex(todo => todo.id === req.params.id);
    if (index > -1) {
      util.todos[index].description = req.body.description;
      res.status(200).json({ message: 'Todo is updated successfully' });
      await util.saveTodos(util.todos);
    }
    else {
      res.status(404).json({ message: 'Todo is not found' });
    }
  }

  async deleteTodo(req, res) {
    const index = util.todos.findIndex(todo => todo.id === req.params.id);
    if (index > -1) {
      util.todos.splice(index, 1);
      await util.saveTodos(util.todos);
      res.status(200).json({ message: 'Todo is deleted successfully' });
    }
    else {
      res.status(404).json({ message: 'Todo is not found' });
    }
  }

  async clearAllTodos(req, res) {
    await util.saveTodos([]);
    res.status(200).json({ message: 'All Todos are deleted' });
  }

  notFound(req, res) {
    const err = new Error('Page Not Found!');
    res.status(404).json({ message: err.message });
  }
}

const todoActions = new TodoActions();
module.exports = todoActions;
