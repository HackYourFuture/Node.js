let fs = require('fs');

function readTodo(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, todoList) => {
    const parsedList = JSON.parse(todoList);
    if (error) {
      if (error.code === 'EN0ENT') {
        console.log('No data found');
      } else {
        console.error(error);
        response.status(500).send('some problem.');
      }
    } else if (request.params.id < parsedList.length) {
      const todoItem = parsedList[++request.params.id]['text'];
      response.json(todoItem);
    } else {
      response.json('Please enter a valid id');
    }
  });
}

function add(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let todos = JSON.parse(data);
      const todo = { text: request.params.text, done: false };
      todos.push(todo);
      let dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    }
  });
}

function clearTodos(request, response) {
  fs.writeFile('./todoList.json', '[]', err => {
    if (err) {
      console.log(err);
    }
    response.send('All todos is deleted!');
  });
}

function markAsDone(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let todos = JSON.parse(data);
      todos[--request.params.id]['done'] = true;
      let dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    }
  });
}
function markAsNotDone(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let todos = JSON.parse(data);
      todos[--request.params.id]['done'] = false;
      let dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    }
  });
}

function remove(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let todos = JSON.parse(data);
      todos.splice(--request.params.id, 1);
      let dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    }
  });
}

function update(request, response) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let todos = JSON.parse(data);
      todos[--request.params.id]['text'] = request.params.newText;
      let dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
      response.send(todos);
    }
  });
}
module.exports = { markAsDone, markAsNotDone, readTodo, remove, add, clearTodos, update };
