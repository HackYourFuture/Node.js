'use strict';

const fs = require('fs');

const help = () => {
  return `
To-Do List CLI Application,
  
  Usage: node . <command> (<argument>)
  
         node index.js <command> (<argument>),

  Commands: 
  
      help                    : Shows help for this application
  
      add <ToDo>              : Adds given argument to end of the list
  
      list                    : Shows to-do list
  
      remove <lineNum>        : Removes specified line from the list
  
      reset                   : Removes everything from the list

      update <lineNum> <ToDo> : Updates specified line number with 
                                given to-do text
`;
};

const list = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('list.txt', 'utf8', (error, toDos) => {
      if (error) return reject(error);
      resolve(toDos.trim());
    });
  });
};

const add = toDo => {
  return new Promise((resolve, reject) => {
    if (!toDo) {
      return reject(new Error('Please provide a to-do.'));
    }
    fs.appendFile('list.txt', toDo + '\n', error => {
      if (error) return reject(error);
      resolve(`'${toDo}' has been added.`);
    });
  });
};

const remove = line => {
  return new Promise((resolve, reject) => {
    if (!line || isNaN(line)) {
      return reject(new Error('Please specify a line number to remove.'));
    }
    fs.readFile('list.txt', 'utf8', (error, toDos) => {
      if (error) {
        return reject(error);
      }
      const toDosArray = toDos.trim().split('\n');
      if (line > toDosArray.length || line < 1) {
        return reject(new Error(`Nothing in line ${line}.`));
      }
      if (toDosArray.length === 1) {
        return resolve(reset());
      }
      const removedToDo = toDosArray.splice(line - 1, 1);
      toDos = toDosArray.join('\n') + '\n';
      fs.writeFile('list.txt', toDos, 'utf8', error => {
        if (error) return reject(error);
        resolve(`'${removedToDo}' in line ${line} has been removed.`);
      });
    });
  });
};

const reset = () => {
  return new Promise((resolve, reject) => {
    fs.unlink('list.txt', error => {
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
    fs.readFile('list.txt', 'utf8', (error, toDos) => {
      if (error) return reject(error);
      const toDosArray = toDos.trim().split('\n');
      if (line > toDosArray.length || line < 1) {
        return reject(new Error(`Nothing in line ${line}.`));
      }
      toDosArray[line - 1] = update;
      toDos = toDosArray.join('\n') + '\n';
      fs.writeFile('list.txt', toDos, 'utf8', error => {
        if (error) return reject(error);
        resolve(`Line ${line} has been updated as ${update}.`);
      });
    });
  });
};

const handleError = error => {
  if (error.code === 'ENOENT') {
    return console.log('You have nothing in the list.');
  }
  console.log(error);
};

module.exports = { help, list, add, remove, reset, update, handleError };
