const fs = require('fs');

function write(req, res, toBeWritten) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./toDo.json', toBeWritten, error => {
      if (error) {
        reject(error);
      }
 else {
        resolve(res.status(200));
      }
    });
  });
}

module.exports = write;
