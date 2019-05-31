const fs = require('fs');
const uuid = require('uuid/v4');

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), 'utf8', error => {
      reject(error);
    });
  });
}

function sendResponse(data, response) {
  response.json(data);
}

function listToDo(path, response) {
  readFile(path)
    .then(data => sendResponse(data, response))
    .catch(error => response.status(404).send({ error: 'there is an error' }););
}

async function addToDo(todoItem, path, response) {
  try {
    await readFile(path).then(data => {
      const todoList = JSON.parse(data);
      const newTodo = {
        id: uuid(),
        name: todoItem.item,
        done: false,
      };
      todoList.push(newTodo);
      writeFile(path, todoList);
    });
    listToDo(path, response);
  } catch {
    response.status(404).send({ error: 'there is an error' });
  }
}

function readToDo(number, path, response) {
  readFile(path)
    .then(data => {
      const todoList = JSON.parse(data);
      const todo = todoList.find(todo => {
        return todo.id == number;
      });
      todo !== undefined
        ? sendResponse(todo.name, response)
        : sendResponse('todo not found', response);
    })
    .catch(error => {
      response.status(404).send({ error: 'there is an error' });;
    });
}

async function markAsDone(number, path, response) {
  try {
    await readFile(path)
      .then(data => {
        const todoList = JSON.parse(data);
        const todo = todoList.find(todo => {
          return todo.id == number;
        });
        todo.done = true;
        writeFile(path, todoList);
      })
      .catch(error => {
        console.log(error);
      });
    listToDo(path, response);
  } catch {
    response.status(404).send({ error: 'there is an error' });
  }
}
async function markAsNotDone(number, path, response) {
  try {
    await readFile(path)
      .then(data => {
        const todoList = JSON.parse(data);
        const todo = todoList.find(todo => {
          return todo.id == number;
        });
        todo.done = false;
        writeFile(path, todoList);
      })
      .catch(error => {
        console.log(error);
      });
    listToDo(path, response);
  } catch {
    response.status(404).send({ error: 'there is an error' });
  }
}

function clearToDos(path, response) {
  writeFile(path, []).then(response.json('You now have a brand new todo list'))
  .catch(error=>response.status(404).send({ error: 'there is an error' });)
}

async function removeToDo(todoItem, path, response) {
  try {
    await readFile(path).then(data => {
      const todoList = JSON.parse(data);
      const filteredOutElement = todoItem - 1;
      const filteredList = todoList.filter((elem, index, arr) => {
        return index !== filteredOutElement;
      });
      writeFile(path, filteredList);
    });
    listToDo(path, response);
  } catch {
    response.status(404).send({ error: 'there is an error' });
  }
}

async function updateToDo(todoItem, todo, path, response) {
  try {
    await readFile(path).then(data => {
      const todoList = JSON.parse(data);
      todoList[--todoItem].name = todo.item;
      writeFile(path, todoList);
    });
    listToDo(path, response);
  } catch {
    response.status(404).send({ error: 'there is an error' });
  }
}

module.exports = {
  listToDo,
  addToDo,
  readToDo,
  markAsDone,
  markAsNotDone,
  clearToDos,
  removeToDo,
  updateToDo,
};
