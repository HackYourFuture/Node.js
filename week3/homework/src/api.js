const uuid = require('uuid');
const Util = require('./util');
const FILENAME = 'todos.json';
const util = new Util(FILENAME);

class Api {
  async readTodos(req, res) {
    let todos = await util.read();
    res.send(todos);
  }

  async createTodo(req, res) {
    try {
      const todos = await util.read();
      const todo = {
        description: req.body.todo.description,
        id: uuid.v4(),
        done: false,
      };
      todos.push(todo);
      await util.save(todos);
      res.end('todo was successful created!');
    } catch (err) {
      res.end(err);
    }
  }

  async updateTodo(req, res) {
    try {
      let todos = await util.read();
      const todo = todos.find(todo => todo.id === req.params.id);
      if (!todo) return res.status(404).send('The task with the given Id was not Found!');
      todo.description = req.body.todo.description;
      await util.save(todos);
      res.status = 201;
      res.end('The update was successful!');
    } catch (err) {
      res.end(err);
    }
  }

  async getSpecificTodo(req, res) {
    let todos = await util.read();
    const todo = todos.find(todo => todo.id === req.params.id);
    if (!todo) return res.status(404).send('The task with the given Id was not Found!');
    res.send(todo);
  }

  async deleteTodo(req, res) {
    try {
      let todos = await util.read();
      const todo = todos.find(todo => todo.id === req.params.id);
      if (!todo) return res.status(404).send('The task with the given Id was not Found!');
      const index = todos.indexOf(todo);
      todos.splice(index, 1);
      await util.save(todos);
      res.status = 201;
      res.end('task successfully deleted!');
    } catch (err) {
      res.end(err);
    }
  }

  async deleteTodos(req, res) {
    try {
      let todos = await util.read();
      todos = [];
      await util.save(todos);
      res.status = 201;
      res.end('tasks successfully deleted!');
    } catch (err) {
      res.end(err);
    }
  }

  async checkTask(req, res, done, task) {
    try {
      const todos = await util.read();
      const todo = todos.find(todo => todo.id === req.params.id);
      if (!todo) return res.status(404).send('The task with the given Id was not Found!');
      done ? (todo.done = true) : (todo.done = false);
      await util.save(todos);
      res.status = 201;
      res.end(task);
    } catch (err) {
      res.end(err);
    }
  }
}

module.exports = Api;
