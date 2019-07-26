'use strict';

const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

const readAndParse = require('./readTodo');

const LIST_FILE_PATH = __dirname + '/list.json';

class ErrorWithStatus extends Error {
  constructor(errorMessage, statusCode) {
    super(errorMessage);
    this.name = 'ErrorWithStatus';
    this.statusCode = statusCode;
  }
}

async function write(jsonData) {
  try {
    await writeFileAsync(LIST_FILE_PATH, JSON.stringify(jsonData, null, 2));
    return jsonData;
  } catch (error) {
    throw error;
  }
}

async function findToDoWithId(id) {
  const toDoList = await readAndParse();
  for (let index = 0; index < toDoList.todos.length; index++) {
    if (toDoList.todos[index].id === id) return { toDoList, index };
  }
  throw new ErrorWithStatus(`No to-do is found with id: ${id}`, 404);
}

function isToDoValid(request) {
  const { todo } = request.body;
  if (request.headers['content-type'] !== 'application/json') {
    throw new ErrorWithStatus('Please set the content type to application/json', 400);
  }
  if (
    todo === null ||
    todo.description === null ||
    todo.description === '' ||
    todo.description.length === 0
  ) {
    throw new ErrorWithStatus('Please provide a valid to-do.', 400);
  }
  return todo;
}

module.exports = {
  LIST_FILE_PATH,
  ErrorWithStatus,
  write,
  findToDoWithId,
  isToDoValid,
};
