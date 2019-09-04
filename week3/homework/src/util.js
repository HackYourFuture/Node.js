const path = require('path');
const fs = require('fs').promises;
const FILE = path.join(__dirname, process.env.FILE || 'todos.json');

class Util {
  constructor(file) {
    this.file = file;
  }
  async loadToDos() {
    try {
      const todos = await fs.readFile(this.file, 'utf8');
      return JSON.parse(todos);
    }
    catch (e) {
      return [];
    }
  }
  async saveTodos(todos) {
    await fs.writeFile(this.file, JSON.stringify(todos));
  }
}
const util = new Util(FILE);
module.exports = util;
