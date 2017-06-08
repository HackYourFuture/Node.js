'use strict';

let fs = require('fs');

let options = process.argv.slice(2);


creatFile();

switch (options[0]) {
    case 'Help':

        help();

        break;

    case 'add':

        addItem();

        break;

    case 'list':

        showList();

        break;

    case 'remove':

        removeItem();

        break;

    case 'reset':

        resetItem();

        break;

    default:

        console.log('Option not found');

        help();
};



function creatFile() {
    if (fs.existsSync('todo.csv')) {
        return fs.readFileSync('todo.csv', 'utf-8')
    } else {
        fs.writeFileSync('todo.csv', '')
        return fs.readFileSync('todo.csv', 'utf-8')

    }
};

function addItem() {
    let todoItem = options[1];
    let file = creatFile();
    if (!todoItem) {
        console.log('Write something !!')
        return;
    }
    let newValue = file + '\r\n' + todoItem;
    fs.writeFileSync('todo.csv', newValue)
    console.log(newValue);


};

function showList() {
    fs.readFile('todo.csv', 'utf-8', function (error, data) {
        if (error) {
            console.error(error)
        } else {
            console.log('Data found ' + '\n', data)
        }
    })

};

function removeItem() {
    fs.readFile('todo.csv', 'utf8', function (error, data) {
        if (error) {
            throw error;
        }
        let number = parseInt(options[1])
        if ((typeof number === 'number' && !isNaN(number))) {

            let lines = data.trim().split('\n');
            if (number > lines.length) {
                console.log(`there is ${lines.length} lines in this file choose between 0 and ${lines.length} `);
            } else if (options[1] == null) {
                console.log(`type a number after remove `);
                return;

            }
            lines.splice(number - 1, 1);
            let joinedLines = lines.join('\n').trim();
            fs.writeFile('todo.csv', joinedLines);
        } else {
            console.log('use only numbers');
        }
    });
};

function resetItem() {
    fs.unlink('./todo.csv');

}

function help() {
    console.log(`
options : 
1) help : show help section.
2) add : add a todo item. 
3) list: show current todo's, or show an appropriate text if there are no todos.
4) remove: remove a todo item by its 1-base myapp.js.
5) reset: remove all todo items from the list.
`);
};