const fs = require('fs');

const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

async function listFileContent(file) {
  try {
    const todos = await readFile(file);
    const jsonTodos = JSON.parse(todos);
    return jsonTodos;
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
}

module.exports = listFileContent;
