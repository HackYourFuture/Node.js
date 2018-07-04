'use strict';

// TODO: Write the homework code in this file
const program = require('commander');
const color = require('colors');
const Confirm = require('prompt-confirm');
const { addTodoItem, readTodoList } = require('./addAndReadTodos');
const args = process.argv.slice(2);
const text = args[1];
const TODO_FILE = 'todo.json';

program
    .version('1.0.0')
    .description(' To-do CLI application '.black.bgWhite)

const createCommands = (cmd, dsc, func) => {
    return program
        .command(cmd)
        .description(dsc)
        .action(func)
};

const add = createCommands('add', 'adds to-do item', async () => {
    const todoItem = await readTodoList(TODO_FILE);
    todoItem.push({ text, done: false });
    await addTodoItem(TODO_FILE, todoItem);
    console.log(`\n-> Added new to-do item.\n`.green + 'To view the list use ' + ' node . list '.green + ' command');
});

const update = createCommands('update <item-position> <new-to-do>', 'modifies the to-do item', async (index, newTodo) => {
    const todo = await readTodoList(TODO_FILE);
    const oldTodo = todo[index - 1].text;
    todo[index - 1].text = newTodo;
    await addTodoItem(TODO_FILE, todo);
    console.log('Updated from '.green + '' + oldTodo + ' to '.green + '' + newTodo);
});

const list = createCommands('list', 'shows the to-do list', async () => {
    const todoList = await readTodoList(TODO_FILE);
    console.log(todoList);
});

const remove = createCommands('remove <item-position>', 'removes selected item', async (itemIndex) => {
    const todos = await readTodoList(TODO_FILE);

    /*I did not include (itemIndex < 0) case here, because when the input is a negative number,
    an error is being thrown automatically.Apparently negative numbers are being viewed as unknown commands/options */
    if (todos.length === 0) {
        return console.log('This list is empty.'.red);

    } else if (itemIndex == 0) {
        console.log('Wrong input.The list index starts at 1.'.red);

    } else if (itemIndex >= 1 && itemIndex <= todos.length) {
        const removedItem = todos.splice(itemIndex - 1, 1);
        await addTodoItem(TODO_FILE, todos);
        console.log('Removed: '.red + JSON.stringify(removedItem).red);

    } else if (itemIndex > todos.length) {
        console.log(`Wrong input.This list has ${todos.length} item/items.`.red);
    };
});

const reset = createCommands('reset', 'clears the list', () => {
    const prompt = new Confirm('Are you sure you want to delete all items?');
    prompt.ask(async (yes, no) => {
        if (yes) {
            await addTodoItem(TODO_FILE, []);
            console.log(' Deleted all to-do items. '.red);
        };
    });
});

program.parse(process.argv);
if (process.argv.length < 3) {
    program.help()
};


