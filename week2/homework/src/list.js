const readTodos = require('./readFile');

async function listTodos() {
  const todos = await readTodos('todos.json');

  if (todos.length > 0) {
    console.log('Todos\t:');
    for (let key of Object.keys(todos)) {
      console.log(`${Number(key) + 1} \t: ${todos[key]} `);
    }
  } else {
    console.log('There is no todo on the list');
  }
}

module.exports = listTodos;
