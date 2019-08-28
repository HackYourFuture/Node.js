const fs = require('fs').promises;
const chalk = require('chalk');

const logScreen = (msg, color) => {
  console.log(chalk[color].inverse(msg));
};

const loadToDos = async () => {
  try {
    const todos = await fs.readFile('notes.json', 'utf8');
    return JSON.parse(todos);
  } catch (err) {
    return [];
  }
};

const saveToDo = async todos => {
  try {
    todos.forEach((todo, order = 1) => (todo.index = ++order));
    const dataJSON = JSON.stringify(todos);
    fs.writeFile('notes.json', dataJSON).then(() => logScreen('Changes are saved', 'green'));
  } catch (err) {
    logScreen("Couldn't save, please try again!", 'red');
  }
};

module.exports = { saveToDo, loadToDos, logScreen };
