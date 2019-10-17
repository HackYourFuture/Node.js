'use strict';
{
  const { readList } = require('./readFile.js');
  const { writeList } = require('./writeFile');
  const program = require('commander');

  const todoListPath = './todoList.json';

  function displayHelp() {
    program
      .version('0.1.0')
      .command('node <file-name> ', 'output usage information')
      .command('list <file-name>', 'list all the items')
      .command('add <file-name> [item]', 'add item to the list')
      .command('update <file-name> [index] [new-item]', 'update list')
      .command('remove <file-name> [index]', 'remove specified item')
      .command('reset <file-name>', 'reset the list')
      .parse(process.argv);
  }

  const initializeTodoList = () => {
    const todoList = [];
    writeList(todoListPath, todoList);
    return todoList;
  };

  const addTodoListItem = async newTodo => {
    try {
      let { todoList } = await readList(todoListPath);
      if (todoList === undefined) {
        todoList = initializeTodoList();
      }

      todoList.forEach((todo, index) => {
        todo.id = index + 1;
      });
      let index = todoList.length + 1;
      todoList.push({ id: index, todo: newTodo });
      writeList(todoListPath, todoList);
    } catch (error) {
      console.error(`There was an error while adding an item: ${error.name} - ${error.message}`);
    }
  };

  const updateTodoListItem = async (updateIndex, updateValue) => {
    let { todoList } = await readList(todoListPath);
    try {
      if (!todoList || todoList.length === 0) {
        console.log('The list is empty!');
      } else if (updateIndex > todoList.length || updateIndex <= 0) {
        console.log(`The index to update must be between 1 - ${todoList.length}`);
      } else {
        todoList = todoList.map(todo => {
          if (todo.id === updateIndex) {
            return { id: updateIndex, todo: updateValue };
          } else {
            return todo;
          }
        });
        writeList(todoListPath, todoList);
      }
    } catch (error) {
      console.error(`There was an error while updating an item: ${error.name} - ${error.message}`);
    }
  };

  const removeTodoListItem = async itemToRemove => {
    let { todoList } = await readList(todoListPath);
    try {
      if (!todoList || todoList.length === 0) {
        console.log('The list is empty!');
      } else if (itemToRemove <= todoList.length && itemToRemove > 0) {
        todoList = todoList.filter(todo => todo.id !== itemToRemove);
        todoList.forEach((todo, index) => {
          todo.id = index + 1;
        });
        writeList(todoListPath, todoList);
      } else {
        console.error(`The index to remove must be between 1 - ${todoList.length}`);
      }
    } catch (error) {
      console.error(`There was an error while removing an item: ${error.name} - ${error.message}`);
    }
  };

  const resetTodoList = async () => {
    const todoList = [];
    writeList(todoListPath, todoList);
  };

  const [_, __, ...commandItems] = process.argv;

  if (commandItems.length === 0 || commandItems[0] === 'help') {
    displayHelp();
  } else if (commandItems[0] === 'list') {
    readList(todoListPath).then(({ todoList }) => {
      if (todoList && todoList === []) {
        console.log(JSON.stringify({ todoList }, null, 2));
      } else {
        console.log('The list is empty!');
      }
    });
  } else if (commandItems[0] === 'add') {
    addTodoListItem(commandItems[1]);
  } else if (commandItems[0] === 'update') {
    updateTodoListItem(Number(commandItems[1]), commandItems[2]);
  } else if (commandItems[0] === 'remove') {
    removeTodoListItem(Number(commandItems[1]));
  } else if (commandItems[0] === 'reset') {
    resetTodoList();
  } else {
    console.error('The command you entered is not valid!');
  }
}
