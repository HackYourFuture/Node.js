'use strict';

{
  const { promisify } = require('util');
  const { writeList } = require('./writeFile.js');
  const fs = require('fs');
  const readFile = promisify(fs.readFile);

  const readList = async todoListPath => {
    let todoList = [];
    try {
      todoList = await readFile(todoListPath, 'utf8');
      return todoList ? JSON.parse(todoList) : todoList;
    } catch (error) {
      if (error.code === 'ENOENT') {
        await writeList(todoListPath);
        return todoList;
      }
      console.log(
        `There was an error while reading the todo list: ${error.name} - ${error.message}`,
      );
      return todoList;
    }
  };

  module.exports = {
    readList,
  };
}
