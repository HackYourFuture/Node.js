const fs = require('fs');

const writeTodos = todos => {
  todos = JSON.stringify(todos);
  fs.writeFile('todos.json', todos, function(err) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = writeTodos;
