'use strict';
const { readFile } = require('./utils');

const getAllTodos = async path => {
  try {
    const { todos } = JSON.parse(await readFile(path, 'utf8'));
    return todos;
  } catch (_) {
    return null;
  }
};

module.exports = getAllTodos;
