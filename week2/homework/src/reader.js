'use strict';
const { readFile } = require('fs');
const { promisify } = require('util');

const readFilePromised = promisify(readFile);

const getAllTodos = async path => {
  try {
    const { todos } = await readFilePromised(path, 'utf8');
    return todos;
  } catch (err) {
    console.error(`Error occurred while reading todos from the file: \
      ${err.message}`);
    return null;
  }
};

module.exports = getAllTodos;
