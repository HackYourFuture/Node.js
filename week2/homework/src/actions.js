const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const actions = {
  add: element => {
    readFile('todo.txt', 'utf-8').then(data => {
      if (data === '') {
        fs.appendFile('todo.txt', element, err => {
          if (err) throw err;
          console.log('an item has been added ...');
        });
      } else {
        fs.appendFile('todo.txt', `\n${element}`, err => {
          if (err) throw err;
          console.log('an item has been added ...');
        });
      }
    });
  },
  remove: number => {
    readFile('todo.txt', 'utf-8').then(data => {
      if (data === '') {
        console.log(`There is no items to remove...`);
      } else {
        const elements = data.split('\n');
        elements.map((element, index) => {
          if (number == index + 1) {
            elements.splice(number - 1, 1);
            fs.writeFile('todo.txt', elements.join('\n'), err => {
              if (err) throw err;
              console.log(`Item number ( ${number} ) has been deleted...`);
            });
          }
        });
      }
    });
  },
  list: () => {
    readFile('todo.txt', 'utf-8').then(data => {
      if (data == '') {
        console.log(`todo list is empty...`);
      } else {
        const elements = data.split('\n');
        elements.map((element, index) => {
          console.log(`${index + 1}- ${element}`);
        });
      }
    });
  },
  reset: () => {
    readFile('todo.txt', 'utf-8').then(data => {
      if (data === '') {
        console.log(`The todo list is already reset...`);
      } else {
        fs.writeFile('todo.txt', '', err => {
          if (err) throw err;
          console.log(`The todo list has been reset...`);
        });
      }
    });
  },
  help: () => {
    console.log(`
  CLI todo List App 
  use: node index [options]
  Options:
    add...............To add an item: (ex: node index add Hi) 
    remove............To remove an item: (ex: node index remove 2)
    list..............To display all items: (ex: node index list)
    reset.............To reset the list: (ex: node index reset)
    help..............To show help: (ex: node index help)
    `);
  },
};

module.exports = actions;
