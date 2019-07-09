'use strict';

const fs = require('fs');

const jsonFilePath = 'list.json';

function readAndParse() {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, 'utf8', (error, listJson) => {
      if (error) return reject(error);
      const listObj = JSON.parse(listJson);
      resolve(listObj.listArr);
    });
  });
}

const list = () => {
  return new Promise((resolve, reject) => {
    readAndParse()
      .then(listArr => {
        const list = listArr.reduce((list, toDo, index) => {
          return list + `${index + 1}: ${toDo}\n`;
        }, '');
        resolve(list.trim());
      })
      .catch(error => reject(error));
  });
};

const add = toDo => {
  return new Promise((resolve, reject) => {
    if (!toDo) {
      return reject(new Error('Please provide a to-do.'));
    }
    readAndParse()
      .catch(error => {
        if (error.code === 'ENOENT') return [];
        handleError(error);
      })
      .then(listArr => {
        listArr.push(toDo);
        fs.writeFile(jsonFilePath, JSON.stringify({ listArr }), error => {
          if (error) return reject(error);
          resolve(`'${toDo}' has been added.`);
        });
      })
      .catch(error => handleError(error));
  });
};

const remove = line => {
  return new Promise((resolve, reject) => {
    if (!line || isNaN(line)) {
      return reject(new Error('Please specify a line number to remove.'));
    }
    readAndParse()
      .then(listArr => {
        if (line > listArr.length || line < 1) {
          return reject(new Error(`Nothing in line ${line}.`));
        }
        if (listArr.length === 1) {
          return resolve(reset());
        }
        const removedToDo = listArr.splice(line - 1, 1);
        fs.writeFile(jsonFilePath, JSON.stringify({ listArr }), 'utf8', error => {
          if (error) return reject(error);
          resolve(`'${removedToDo}' in line ${line} has been removed.`);
        });
      })
      .catch(error => handleError(error));
  });
};

const reset = () => {
  return new Promise((resolve, reject) => {
    fs.unlink(jsonFilePath, error => {
      if (error) return reject(error);
      resolve('Your to-do list is now empty.');
    });
  });
};

const update = (line, update) => {
  return new Promise((resolve, reject) => {
    if (!line || isNaN(line)) {
      return reject(new Error('Please specify a line number to update.'));
    }
    if (!update) {
      return reject(new Error('Please provide a to-do.'));
    }
    readAndParse()
      .then(listArr => {
        if (line > listArr.length || line < 1) {
          return reject(new Error(`Nothing in line ${line}.`));
        }
        listArr[line - 1] = update;
        fs.writeFile(jsonFilePath, JSON.stringify({ listArr }), 'utf8', error => {
          if (error) return reject(error);
          resolve(`Line ${line} has been updated as ${update}.`);
        });
      })
      .catch(error => handleError(error));
  });
};

const handleError = error => {
  if (error.code === 'ENOENT') {
    return console.log('You have nothing in the list.');
  }
  console.log(error);
};

module.exports = { list, add, remove, reset, update, handleError };
