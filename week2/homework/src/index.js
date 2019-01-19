/*'use strict';

// TODO: Write the homework code in this file

const fs = require('fs');

const args = process.argv;

const command = args[2];

//console.log(args);

//console.log({command});

if (command === 'list'){

    fs.readFile(todosFileName,'utf8', (error,data) => {
        if (error) {
          //console.log(chalk.red(error));
          console.log(chalk.red(error));
        
        return;
    }
    const todos = data.split(',');
    //console.log( {todos});

    const todosOnNewLines = todos.join('\n');

    console.log(chalk.green(todosOnNewLines));

});
}
*/

const chalk = require('chalk');
const fs = require('fs');

const args = process.argv;

const command = args[2];

const todosFileName = './todos.txt';

function readTodos(cbFn) {
    fs.readFile(todosFileName, 'utf8', (error, data) => {
        if (error) {
            console.log(chalk.red(error));
            return;
        }

        const todos = (!data) ? [] : JSON.parse(data);

        cbFn(todos);
    });
}

function writeTodos(todos, okMsg) {
    const todosTxt = JSON.stringify(todos);

    fs.writeFile(todosFileName, todosTxt, 'utf8', (error) => {
        if (error) {
            console.log(chalk.red(error));
            return;
        }

        console.log(chalk.green(okMsg));
    });
}

if (command === 'list') {
    readTodos((todos) => {
        if (!todos || todos.length === 0) {
            console.log(chalk.yellow('There are no to-dos'));
            return;
        }

        const todosOnNewLines = todos.join('\n');
        console.log(chalk.green(todosOnNewLines));
    });
}

if (command === 'add') {
    const newTodoTxt = args[3];

    readTodos((todos) => {
        todos.push(newTodoTxt);
        writeTodos(todos, "Data added");
    });
}

if (command === 'remove') {
    const todoPosition = parseInt(args[3], 10);
    if (isNaN(todoPosition)) {
        console.log(chalk.red("Invalid to-do position: '" + args[3] + "'"));
        return;
    }
    if (todoPosition < 1) {
        console.log(chalk.red("The minimum position to delete is 1, provided: '" + todoPosition + "'"));
        return;
    }

    readTodos((todos) => {
        if (todoPosition > todos.length) {
            console.log(chalk.red("Invalid to-do position: '" + args[3] + "', there are only " + todos.length + " elements"));
            return;
        }

        todos.splice(todoPosition-1, 1);

        writeTodos(todos, "To-do at position " + todoPosition + " has been removed");
    });
}


if (command === 'update') {
    const todoPosition = parseInt(args[3], 10);
    if (isNaN(todoPosition)) {
        console.log(chalk.red("Invalid to-do position: '" + args[3] + "'"));
        return;
    }
    if (todoPosition < 1) {
        console.log(chalk.red("The minimum position to delete is 1, provided: '" + todoPosition + "'"));
        return;
    }
    const newTodoTxt = args[4];

    readTodos((todos) => {
        if (todoPosition > todos.length) {
            console.log(chalk.red("Invalid to-do update: '" + args[3] + "', there are only " + todos.length + " elements"));
            return;
        }

        todos[todoPosition-1] = newTodoTxt;

        writeTodos(todos, "To-do at position " + todoPosition + " has been updated");
    });
}


if (command === 'reset') {
    fs.truncate(todosFileName, 0, (error, data) => {
        console.log(chalk.yellow("All to-dos have been removed"));
    });
}

if (!command || command === 'help') {
    console.log("A parameter is necessary to execute\n\n");
    console.log("Usage:");
    console.log("   list: Shows current to-dos, or shows an appropriate text if there are no to-dos\n");
    console.log("       node index.js list\n");
    
    console.log("   add: Adds a to-do item. All the words behind add are entered as 1 to-do item to the list\n");
    console.log('       node index.js add "Buy groceries"\n');  

    console.log("   remove: Removes a to-do item by its 1-base index, e.g. to remove second item, execute\n");
    console.log("       node index.js remove 2\n");  

    console.log("   reset: Removes all to-do items from the list:\n");
    console.log("       node index.js reset\n");
    
    console.log("   update: Updates a to-do item with new text:\n");
    console.log('       node index.js update 3 "Brush teeth"\n');  
}

