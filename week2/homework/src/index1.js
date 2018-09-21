'use strict';

const fs = require('fs');
const readFile = fs.readFileSync('./data.json', 'utf8');
const readindex = fs.readFileSync('./index.txt', 'utf8');
var json = JSON.parse(readFile);
const cmd = process.argv[2];
const todo = process.argv[3];
const todo2 = process.argv[4];

switch (cmd) {
    case 'add':
        add(todo);
        break;
    case 'remove':
        remove(todo);
        break;
    case 'list':
        todolist();
        break;
    case 'reset':
        reset();
        break;
    case 'update':
        update(todo, todo2);
        break;
    case 'help':
        help();
        break;
}

function add(todo) {
    const index = parseInt(readindex) + 1;
    const obj = {};
    obj.text = todo;
    json.todo.push(obj);
    fs.writeFileSync('./data.json', JSON.stringify(json, null, 2));
    fs.writeFileSync('index.txt', index);

};

function remove(key) {
    if (todo < 0) {
        console.log('input should be positive number');
    } else if (json.todo.length === 0) {
        console.log('there is nothing in your todo list !')
    } else if (json.todo.length < key) {
        console.log('incorrect todo number')
    } else {
        json.todo.splice(0, 0, '1');
        json.todo.splice(todo, 1);
        json.todo.splice(0, 1);
        fs.writeFileSync('./data.json', JSON.stringify(json, null, 2));
        console.log('todo ' + todo + ' has been deleted');
    };
};

function todolist() {
    if (json.todo.length === 0) {
        console.log('you have nothing to do :P ! ');
    } else {
        json.todo.forEach((element, index) => {
            index = index + 1;
            console.log(index + ' ' + element.text);
        });
    }
}

function reset() {
    let emptyTodoFile = { "todo": [] }
    fs.writeFileSync('./data.json', JSON.stringify(emptyTodoFile, null, 2))
    fs.writeFileSync('./index.txt', 0)
    console.log('you have reset your todo list')
}

function update(key, todo) {
    if (key < 0) {
        console.log('input should be positive number');
    } else if (json.todo.length === 0) {
        console.log('there is nothing in your todo list !')
    } else if (json.todo.length < key) {
        console.log('there is no todo with the same input number')
    } else {
        const obj = {};
        obj.text = todo;
        json.todo.splice(0, 0, '1')
        json.todo.splice(key, 1, obj)
        json.todo.splice(0, 1);
        fs.writeFileSync('./data.json', JSON.stringify(json, null, 2))
        console.log('todo ' + key + 'updated')
    }
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