const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const theMethods = {
  // ADD:
  add: item => {
    readFile(__dirname + '/todo.txt', 'utf-8').then(content => {
      if (content === '') {
        fs.writeFile(__dirname + '/todo.txt', item, err => {
          console.log("an item 's been added to the toDo list...");
        });
      } else {
        fs.appendFile(__dirname + '/todo.txt', `\n${item}`, err => {
          if (err) throw err;
          console.log("an item 's been added to the toDo list...");
        });
      }
    });
  },

  // DELETE:
  delete: id => {
    readFile(__dirname + '/todo.txt', 'utf-8').then(content => {
      const contentArr = content.split('\n');
      contentArr.forEach((item, index) => {
        if (id == index + 1) {
          const removed = contentArr.splice(id - 1, 1);
          fs.writeFile(__dirname + '/todo.txt', contentArr.join('\n'), err => {
            if (err) throw err;
            console.log(`The list item ${id}: 's been deleted...`);
          });
        }
      });
    });
  },

  // UPDATE:
  update: (id, updating) => {
    readFile(__dirname + '/todo.txt', 'utf-8').then(content => {
      const contentArr = content.split('\n');
      contentArr.forEach((item, index) => {
        if (id == index + 1) {
          contentArr.splice(id - 1, 1, updating);
          fs.writeFile(__dirname + '/todo.txt', contentArr.join('\n'), err => {
            if (err) throw err;
            console.log(`The list item ${id}: 's been updated...`);
          });
        }
      });
    });
  },

  // READ THE LIST:
  readList: () => {
    readFile(__dirname + '/todo.txt', 'utf-8').then(content => {
      const contentArr = content.split('\n');
      if (!contentArr[0]) {
        console.log(`your toDo list is empty...`);
      } else {
        contentArr.forEach((item, index) => {
          console.log(`-${index + 1} ${item}`);
        });
      }
    });
  },

  // RESET:
  reset: () => {
    fs.writeFile(__dirname + '/todo.txt', '', err => {
      if (err) throw err;
      console.log(`The toDo list's been reset...`);
    });
  },

  // DISPLAY HELP:
  displayHelp: () => {
    console.log(`
  HackYourFuture Node.js Week 2 - CLI To-Do App Homework
  Usage: node index.js [options]
  Options:
    add...............To add a list item: (MUST be quoted for more than a word).
    delete............To remove a list item. (Must use the indicating item number).
    update............To update an item.
    list..............To display all the list items.
    reset.............To remove all the list items.
    help..............To show help manuel
    `);
  },
};

module.exports = theMethods;
