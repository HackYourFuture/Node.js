const fs = require('fs');
const path = '../todos.json';

function saveTodos(todos) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(todos, null, 2), error =>
      error == null ? resolve() : reject(error)
    );
  });
}
module.exports = saveTodos;
