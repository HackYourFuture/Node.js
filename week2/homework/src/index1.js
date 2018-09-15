'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const readFile = fs.readFileSync('./data.json', 'utf8');
const readindex = fs.readFileSync('./index.txt', 'utf8');
var json = JSON.parse(readFile);


const cmd = process.argv[2]
const todo = process.argv[3];
const todo2 = process.argv[4];
switch (cmd) {
    case 'add':
        add(todo);
        break;
    case 'remove':
        remove(todo)
        break;
    case 'list':
        todolist()
        break;
    case 'reset':
        reset()
        break;
    case 'update':
        update(todo, todo2)
        break;
    case 'help':
        help()
        break;


}

function add(todo) {
    const index = parseInt(readindex) + 1;
    const key = index;
    const obj = {};
    obj[key] = todo;
    Object.assign(json.todo, obj);
    fs.writeFileSync('./data.json', JSON.stringify(json, null, 2))
    fs.writeFileSync('index.txt', index)

};


function remove(todo) {
    delete json.todo[todo]
    fs.writeFileSync('./data.json', JSON.stringify(json, null, 2))
    console.log('todo ' + todo + ' has been deleted')
}

function todolist() {
    const todosValues = Object.values(json.todo)

    if (todosValues.length === 0) {
        console.log('you have nothing to do :P ! ');
    } else {
        console.log(todosValues.join('\n'))
    }
}

function reset() {
    let emptyTodoFile = { "todo": {} }
    fs.writeFileSync('./data.json', JSON.stringify(emptyTodoFile, null, 2))
    fs.writeFileSync('./index.txt', 0)
}


function update(key, todo) {
    const obj = {};
    obj[key] = todo;
    Object.assign(json.todo, obj);
    fs.writeFileSync('./data.json', JSON.stringify(json, null, 2))
}

function help() {
    console.log('\n' +
        'use add <text> to add to-do to the list '
        + '\n' + '\n' +
        'use remove <number> to remove to-do from the list'
        + '\n' + '\n' +
        'use update <number> <text> to update to-dos from the list '
        + '\n' + '\n' +
        'use reset to clear to-dos list '
        + '\n' + '\n' +
        'use list to show all to-doss '
        + '\n'
    )
}