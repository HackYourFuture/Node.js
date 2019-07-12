const program = require('commander');
const fs = require('fs');

program
  .option('add <new todo>', 'Add new todo item', function(todoItem) {
    fs.readFile('./bonus/list.json', 'utf8', (error, toDos) => {
      if (error) {
        console.log(error);
      }
      const todoList = JSON.parse(toDos);
      todoList.push(todoItem);
      const newList = JSON.stringify(todoList, null, 2);
      console.log(newList);
      return fs.writeFile('./bonus/list.json', newList, error => console.log(error));
    });
  })
  .option('list', 'List all todo items', function() {
    fs.readFile('./bonus/list.json', 'utf8', (error, toDos) => {
      if (error) {
        console.log(error);
      }
      console.log(toDos);
    });
  })
  .option('reset', 'Removes all todo items', function() {
    fs.writeFile('./bonus/list.json', '[]', error => console.log(error));
  })
  .option('remove <todo row>', 'Remove one todo item', function(todoItem) {
    fs.readFile('./bonus/list.json', 'utf8', (error, toDos) => {
      if (error) {
        console.log(error);
      }
      const todoList = JSON.parse(toDos);
      const filteredList = todoList.filter((elem, index) => index !== Number(todoItem) - 2);
      const newList = JSON.stringify(filteredList, null, 2);
      console.log(newList);
      return fs.writeFile('./bonus/list.json', newList, error => console.log(error));
    });
  })
  // The `update` takes only one argument, the second one is `undefined`.
  // When I try to update an item it becomes `null`
  .option('update <row number> <new value>', 'update one todo item', function(todoItem, newVal) {
    fs.readFile('./bonus/list.json', 'utf8', (error, toDos) => {
      if (error) {
        console.log(error);
      }
      const todoList = JSON.parse(toDos);
      const mappedList = todoList.map((elem, index) =>
        index === Number(todoItem) - 2 ? newVal : elem,
      );
      const newList = JSON.stringify(mappedList, null, 2);
      console.log(newList);
      return fs.writeFile('./bonus/list.json', newList, error => console.log(error));
    });
  });
program.parse(process.argv);
// error on unknown commands
program.on('command:*', function() {
  console.error(
    `Please write a valid number and one of the following commands:
    \n node . list
    To show current to-dos, or shows an appropriate text if there are no to-dos

    \n node . add "Buy groceries"
    To add a to-do item. All the words behind add are entered as 1 to-do item to the list.

    \n node . remove (number)
    To remove a to-do item by its 1-base index.
    \n node . update 3 "Brush teeth"
    Updates a to-do item with new text

    \n node . reset
    To remove all to-do items from the list`,
    program.args.join(' '),
  );
  process.exit(1);
});
