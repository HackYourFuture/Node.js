'use strict';
const { writeFile } = require('./utils');

const saveTodos = async(path, todos) => {
  try {
    await writeFile(path, JSON.stringify({ todos }));
  }
 catch (error) {
    console.error(`Error occurred while saving todos to the file: \
    ${error.message}`);
  }
};

module.exports = saveTodos;
