const fs = require('fs');
const config = require('./config');

//* WeakMap for private property(_todos) and methods(_read, _write)
const _todos = new WeakMap();
const _read = new WeakMap();
const _write = new WeakMap();

class TodoList {
  constructor(file) {
    this.file = file;

    _read.set(this, file => {
      const data = fs.readFileSync(file, { encoding: config.ENCODING });
      return JSON.parse(data);
    });

    _write.set(this, data => {
      fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
    });
    _todos.set(this, _read.get(this)(this.file));
  }

  get todos() {
    return _todos.get(this);
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
      //* Id will be 1 if the todo list is empty, otherwise 1 greater than the max id
      id: this.todos.length ? Math.max(...this.todos.map(i => i.id)) + 1 : 1,
      description: task
    });
    _write.get(this)(this.todos);
  }

  remove(id) {
    if (!this.todos.map(i => i.id).includes(parseInt(id))) {
      throw new Error('Invalid Index');
    }
    const filteredTodos = this.todos
      .filter(task => task.id !== id)
      .map(task => task.description)
      .reduce((tasks, description, index) => {
        tasks.push({ id: index + 1, description });
        return tasks;
      }, []);
    _write.get(this)(filteredTodos);
  }

  reset() {
    _todos.set(this, []);
    _write.get(this)(this.todos);
  }

  update(id, task) {
    if (!this.todos.map(i => i.id).includes(parseInt(id))) {
      throw new Error('Invalid Index');
    }
    if (!task.length) {
      throw new Error('Task required');
    }
    this.todos.find(item => item.id === +id).description = task;
    _write.get(this)(this.todos);
  }
}

const todoList = new TodoList(config.DATA_FILE);
module.exports = todoList;
