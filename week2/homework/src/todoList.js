const fs = require('fs');

const config = require('./config')

const newTodos = new WeakMap();
const newRead = new WeakMap();
const newWrite = new WeakMap();

class TodoList {
  constructor(file) {
    this.file = file;

    newRead.set(this, file => {
      const data = fs.readFileSync(file, { encoding: config.ENCODING });
      return JSON.parse(data);
    });

    newWrite.set(this, data => {
      fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
    });
    newTodos.set(this, newRead.get(this)(this.file));
  }

  get todos() {
    return newTodos.get(this);
  }

  list() {
    if (!this.todos.length) throw new Error('No Task');
    return this.todos;
  }

  add(task) {
    if (!task.length) {
      throw new Error('Task required');
    }
    this.todos.push({
      id: this.todos.length ? Math.max(...this.todos.map(i => i.id)) + 1 : 1,
      description: task
    });
    newWrite.get(this)(this.todos);
  }

  remove(id) {
    const todo = this.todos.find(item => item.id === parseInt(id));
    if (!todo) throw new Error('Invalid Index');
    const filteredTodos = this.todos.filter(task => task.id !== id);
    newWrite.get(this)(filteredTodos);
  }

  reset() {
    newTodos.set(this, []);
    newWrite.get(this)(this.todos);
  }

  update(id, task) {
    const todo = this.todos.find(item => item.id === parseInt(id));
    if (!todo) throw new Error('Invalid Index');
    if (!task.length) throw new Error('Task required');
    todo.description = task;
    newWrite.get(this)(this.todos);
  }
}

const todoList = new TodoList(config.DATA_FILE);
module.exports = todoList;