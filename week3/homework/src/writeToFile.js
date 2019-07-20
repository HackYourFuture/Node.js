const fs = require('fs');

function writeToFile(todos) {
  return new Promise((resolve, reject) =>
    fs.writeFile('./todos.json', JSON.stringify(todos), (error, todos) => {
      if (error) {
        reject(error);
      } else {
        resolve(todos);
      }
    }),
  );
}
module.exports = writeToFile;
