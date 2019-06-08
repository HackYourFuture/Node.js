const fs = require('fs');

function readTodo(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    const todos = JSON.parse(data);
    if (error) {
      if (error.code === 'EN0ENT') {
        console.log('no data found');
      } else console.error(error);
      response.status(500).send('some problem.');
    } else if (request.params.id <= todos.length && request.params.id > 0) {
      const todoItem = parsedList[request.params.id - 1]['text'];
      response.json(todoItem);
    } else if (0 >= request.params.id) {
      response.status(400).send('Please enter a valid id');
    } else {
      response.status(404).send('Please enter a valid id');
    }
  });
}

function add(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      response.status(500).send('some problem.');
    } else {
      const todos = JSON.parse(data);
      const todo = { text: request.params.text, done: false };
      todos.push(todo);
      const dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    }
  });
}

function clearTodos(request, response) {
  fs.writeFile('./todoList.json', '[]', err => {
    if (err) {
      console.log(err);
      response.status(500).send('some problem.');
    }
    response.send('All todos is deleted!');
  });
}

function markAsDone(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    const todos = JSON.parse(data);
    if (error) {
      console.log(error);
      response.status(500).send('some problem.');
    } else if (request.params.id <= todos.length && request.params.id > 0) {
      todos[request.params.id - 1]['done'] = true;
      const dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    } else if (0 >= request.params.id) {
      response.status(400).send('Please enter a valid id');
    } else {
      response.status(404).send('Please enter a valid id');
    }
  });
}
function markAsNotDone(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    const todos = JSON.parse(data);
    if (error) {
      console.log(error);
      response.status(500).send('some problem.');
    } else if (request.params.id <= todos.length && request.params.id > 0) {
      todos[request.params.id - 1]['done'] = false;
      const dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    } else if (0 >= request.params.id) {
      response.status(400).send('Please enter a valid id');
    } else {
      response.status(404).send('Please enter a valid id');
    }
  });
}

function remove(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    const todos = JSON.parse(data);
    if (error) {
      response.status(500).send('some problem.');
      console.log(error);
    } else if (request.params.id <= todos.length && request.params.id > 0) {
      todos.splice(request.params.id - 1, 1);
      const dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    } else if (0 >= request.params.id) {
      response.status(400).send('Please enter a valid id');
    } else {
      response.status(404).send('Please enter a valid id');
    }
  });
}

function update(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    const todos = JSON.parse(data);
    if (error) {
      response.status(500).send('some problem.');
      console.log(error);
    } else if (request.params.id <= todos.length && request.params.id > 0) {
      todos[request.params.id - 1]['text'] = request.params.newText;
      const dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    } else if (0 >= request.params.id) {
      response.status(400).send('Please enter a valid id');
    } else {
      response.status(404).send('Please enter a valid id');
    }
  });
}
module.exports = { markAsDone, markAsNotDone, readTodo, remove, add, clearTodos, update };
