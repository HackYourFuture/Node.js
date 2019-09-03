const fs = require('fs');
const { promisify } = require('util');
const uuidv4 = require('uuid/v4');
const Joi = require('@hapi/joi');

class Todos {
  constructor(file) {
    this.file = file;
    this.readFromFile = promisify(fs.readFile).bind(this, this.file, 'utf8');
    this.writeToFile = promisify(fs.writeFile).bind(this, this.file);
  }

  async readTodos(req, res) {
    try {
      const todos = JSON.parse(await this.readFromFile());
      res.json(todos);
    } catch (error) {
      Todos.handleError(res, error);
    }
  }

  async readTodo(req, res) {
    try {
      const todos = JSON.parse(await this.readFromFile());
      const todo = todos.find(todo => todo.id == req.params.id);
      if (!todo) return res.status(404).send(`${req.params.id} is not a valid id`);
      res.json(todo);
    } catch (error) {
      Todos.handleError(res, error);
    }
  }

  async createTodos(req, res) {
    try {
      const { error } = Todos.validateTodo(req.body);
      if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
      const { todo } = req.body;
      const todos = JSON.parse(await this.readFromFile());
      todos.push(Object.assign(todo, { id: uuidv4(), done: false }));
      await this.writeToFile(JSON.stringify(todos, null, 2));
      res.status(201).json(todo);
    } catch (error) {
      Todos.handleError(res, error);
    }
  }

  async updateTodos(req, res) {
    try {
      const { error } = Todos.validateTodo(req.body);
      if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
      const { todo } = req.body;
      const todos = JSON.parse(await this.readFromFile());
      const originalTodo = todos.find(todo => todo.id == req.params.id);
      if (!originalTodo) return res.status(404).send(`${req.params.id} is not a valid id`);
      originalTodo.description = todo.description;
      await this.writeToFile(JSON.stringify(todos, null, 2));
      res.json(originalTodo);
    } catch (error) {
      Todos.handleError(res, error);
    }
  }

  async markAsDone(req, res) {
    try {
      const todos = JSON.parse(await this.readFromFile());
      const originalTodo = todos.find(todo => todo.id == req.params.id);
      if (!originalTodo) return res.status(404).send(`${req.params.id} is not a valid id`);
      originalTodo.done = true;
      await this.writeToFile(JSON.stringify(todos, null, 2));
      res.json(originalTodo);
    } catch (error) {
      Todos.handleError(res, error);
    }
  }

  async markAsNotDone(req, res) {
    try {
      const todos = JSON.parse(await this.readFromFile());
      const originalTodo = todos.find(todo => todo.id == req.params.id);
      if (!originalTodo) return res.status(404).send(`${req.params.id} is not a valid id`);
      originalTodo.done = false;
      await this.writeToFile(JSON.stringify(todos, null, 2));
      res.json(originalTodo);
    } catch (error) {
      Todos.handleError(res, error);
    }
  }

  async deleteTodo(req, res) {
    try {
      const todos = JSON.parse(await this.readFromFile());
      const deletedTodo = todos.findIndex(todo => todo.id == req.params.id);
      if (!deletedTodo) return res.status(404).send(`${req.params.id} is not a valid id`);
      todos.splice(deletedTodo, 1);
      await this.writeToFile(JSON.stringify(todos, null, 2));
      res.sendStatus(204);
    } catch (error) {
      Todos.handleError(res, error);
    }
  }

  async deleteTodos(req, res) {
    try {
      await this.writeToFile(JSON.stringify([], null, 2));
      res.sendStatus(204);
    } catch (error) {
      Todos.handleError(res, error);
    }
  }

  static handleError(res, error) {
    return res.status(500).send({ error });
  }

  static validateTodo(todo) {
    const schema = Joi.object().keys({
      todo: Joi.object()
        .keys({
          description: Joi.string()
            .min(2)
            .required(),
        })
        .required(),
    });

    return Joi.validate(todo, schema);
  }
}

module.exports = Todos;
