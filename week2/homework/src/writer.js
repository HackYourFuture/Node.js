'use strict';
const { writeFile } = require('./utils');

const saveTodos = async (path, todos) => {
  try {
    await writeFile(path, JSON.stringify({ todos }));
    return true;
  } catch (_) {
    return false;
  }
};

module.exports = saveTodos;
