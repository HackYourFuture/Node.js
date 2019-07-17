'use strict';

const fs = require('fs');
const uuidv4 = require('uuid/v4');

const HELP_FILE_PATH = __dirname + '/help.json';
const LIST_FILE_PATH = __dirname + '/list.json';
const DEFAULT_ENCODING = 'utf8';

class ErrorWithStatus extends Error {
  constructor(errorMessage, statusCode) {
    super(errorMessage);
    this.name = 'ErrorWithStatus';
    this.statusCode = statusCode;
  }
}

function findToDoWithId(id) {
  return new Promise((resolve, reject) => {
    readAndParse()
      .then(toDoList => {
        for (let index = 0; index < toDoList.todos.length; index++) {
          if (toDoList.todos[index].id === id) return { toDoList, index };
        }
      })
      .then(listAndIndex => {
        return listAndIndex === undefined
          ? reject(new ErrorWithStatus(`No to-do is found with id: ${id}`, 404))
          : resolve(listAndIndex);
      })
      .catch(error => reject(error));
  });
}

function isToDoValid(request) {
  return new Promise((resolve, reject) => {
    const { todo } = request.body;
    if (request.headers['content-type'] !== 'application/json') {
      return reject(new ErrorWithStatus('Please set the content type to application/json', 400));
    }
    if (
      todo === null ||
      todo.description === null ||
      todo.description === '' ||
      todo.description.length === 0
    ) {
      return reject(new ErrorWithStatus('Please provide a valid to-do.', 400));
    }
    return resolve(todo);
  });
}

function write(jsonData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(LIST_FILE_PATH, JSON.stringify(jsonData, null, 2), error => {
      if (error) return reject(error);
      return resolve(jsonData);
    });
  });
}

function readAndParse(file) {
  return new Promise((resolve, reject) => {
    const filePath = file === 'help' ? HELP_FILE_PATH : LIST_FILE_PATH;
    fs.readFile(filePath, DEFAULT_ENCODING, (error, jsonData) => {
      if (error) {
        if ((error.code = 'ENOENT')) return resolve({ todos: [] });
        return reject(error);
      }
      return resolve(JSON.parse(jsonData));
    });
  });
}

const create = request => {
  return new Promise((resolve, reject) => {
    isToDoValid(request)
      .then(todo => {
        todo.id = uuidv4();
        todo.done = false;
        return todo;
      })
      .then(todo => {
        readAndParse().then(toDoList => {
          toDoList.todos.push(todo);
          write(toDoList).then(result => resolve(result));
        });
      })
      .catch(error => reject(error));
  });
};

const update = (request, id) => {
  return new Promise((resolve, reject) => {
    findToDoWithId(id)
      .then(listAndIndex => {
        const { toDoList, index } = listAndIndex;
        isToDoValid(request)
          .then(todo => {
            toDoList.todos[index].description = todo.description;
            return toDoList;
          })
          .then(toDoList => {
            return write(toDoList).then(result => resolve(result));
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
};

const deleteToDo = id => {
  return new Promise((resolve, reject) => {
    if (!id) {
      fs.unlink(LIST_FILE_PATH, error => reject(error));
      return resolve({ todos: [] });
    }
    findToDoWithId(id)
      .then(listAndIndex => {
        const { toDoList, index } = listAndIndex;
        toDoList.todos.splice([index], 1);
        return write(toDoList).then(result => resolve(result));
      })
      .catch(error => reject(error));
  });
};

const showOneToDo = id => {
  return new Promise((resolve, reject) => {
    findToDoWithId(id)
      .then(listAndIndex => {
        const { toDoList, index } = listAndIndex;
        return resolve(toDoList.todos[index]);
      })
      .catch(error => reject(error));
  });
};

const mark = (id, requestMethod) => {
  return new Promise((resolve, reject) => {
    findToDoWithId(id)
      .then(listAndIndex => {
        const { toDoList, index } = listAndIndex;
        toDoList.todos[index].done = requestMethod === 'DELETE' ? false : true;
        return toDoList;
      })
      .then(toDoList => {
        return write(toDoList).then(result => resolve(result));
      })
      .catch(error => reject(error));
  });
};

const handleError = error => {
  return { Oops: error.message };
};

module.exports = { readAndParse, create, update, deleteToDo, showOneToDo, mark, handleError };
