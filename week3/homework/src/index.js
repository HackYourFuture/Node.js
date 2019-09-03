/* eslint-disable no-unneeded-ternary */
'use strict';

const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid/v4');
const express = require('express');

const app = express();
app.use(express.json());
app.set('port', process.env.PORT || 3000);

const PORT = app.get('port');
const FILE = path.join(__dirname, process.env.FILE || 'todos.json');

app.get('/', (req, res) => {
  res.json({ message: 'This is a todo app.' });
});

class Util {
  static async loadToDos() {
    try {
      const todos = await fs.readFile(FILE, 'utf8');
      return JSON.parse(todos);
    }
    catch (e) {
      return [];
    }
  }
  static async saveTodos(todos) {
    await fs.writeFile(FILE, JSON.stringify(todos));
  }
}

class Todo {
  constructor(description) {
    this.id = uuid();
    this.description = description;
    this.isCompleted = false;
  }
}

class TodoActions {
  static async readToDo(req, res) {
    const todos = await Util.loadToDos();
    const todo = todos.find(todo => todo.id === req.params.id);
    if (todo) res.status(200).json({ message: 'Todo found', todos: todo });
    else res.status(404).json({ message: 'Todo is not found' });
  }

  static async readToDos(req, res) {
    const todos = await Util.loadToDos();
    res.status(200).json({ message: 'TODO LIST', todos: todos });
  }

  static async createToDo(req, res) {
    try {
      if (req.body.description.trim()) {
        const todos = await Util.loadToDos();
        todos.push(new Todo(req.body.description));
        Util.saveTodos(todos);
        res.status(200).json({ message: 'Todo is created successfully' });
      }
      else {
        res.status(400).json({ message: 'Description is empty!' });
      }
    }
    catch (e) {
      res.status(400).json({ message: 'Type description correctly' });
    }
  }

  static async markToDo(req, res) {
    const todos = await Util.loadToDos();
    const index = todos.findIndex(todo => todo.id === req.params.id);
    const markType = req.method === 'POST' ? true : false;
    const msg = req.method === 'POST' ? 'completed' : 'uncompleted';

    if (index > -1) {
      todos[index].isCompleted = markType;
      res.status(200).json({ message: `Todo is signed as ${msg}` });
      Util.saveTodos(todos);
    }
    else {
      res.status(404).json({ message: 'Todo is not found' });
    }
  }

  static async updateTodo(req, res) {
    const todos = await Util.loadToDos();
    const index = todos.findIndex(todo => todo.id === req.params.id);

    if (index > -1) {
      todos[index].description = req.body.description;
      res.status(200).json({ message: 'Todo is updated successfully' });
      Util.saveTodos(todos);
    }
    else {
      res.status(404).json({ message: 'Todo is not found' });
    }
  }

  static async deleteTodo(req, res) {
    const todos = await Util.loadToDos();
    const index = todos.findIndex(todo => todo.id === req.params.id);

    if (index > -1) {
      todos.splice(index, 1);
      Util.saveTodos(todos);
      res.status(200).json({ message: 'Todo is deleted successfully' });
    }
    else {
      res.status(404).json({ message: 'Todo is not found' });
    }
  }

  static async clearAllTodos(req, res) {
    Util.saveTodos([]);
    res.status(200).json({ message: 'All Todos are deleted' });
  }
  static customError(req, res) {
    const err = new Error('Page Not Found!');
    res.status(404).json({ message: err.message });
  }
}

app
  .get('/todos/:id', TodoActions.readToDo)

  .get('/todos', TodoActions.readToDos)

  .post('/todos', TodoActions.createToDo)

  .post('/todos/:id/done', TodoActions.markToDo)

  .put('/todos/:id', TodoActions.updateTodo)

  .delete('/todos/:id', TodoActions.deleteTodo)

  .delete('/todos/:id/done', TodoActions.markToDo)

  .delete('/todos/', TodoActions.clearAllTodos)

  .use('', TodoActions.customError)

  .listen(PORT, () => console.log(`Server is activated on port ${PORT}.`));
