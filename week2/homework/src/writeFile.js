'use strict';
{
  const { promisify } = require('util');
  const fs = require('fs');
  const writeFile = promisify(fs.writeFile);

  const writeList = async (listPath, todoList) => {
    try {
      await writeFile(listPath, JSON.stringify({ todoList }, null, 2));
    } catch (error) {
      console.log(
        `There was an error while writing the todo list: ${error.name} - ${error.message}`,
      );
    }
  };

  module.exports = {
    writeList,
  };
}
