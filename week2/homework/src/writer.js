'use strict';
const { writeFile } = require('./utils');

const saveTodos = async (path, todos) => {
  try {
    await writeFile(path, JSON.stringify({ todos }, null, 2));
    return true;
  } catch (_) {
    return false;
  }
};

module.exports = saveTodos;
