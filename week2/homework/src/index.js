'use strict';

let fs = require('fs');
let command = process.argv[2];

if (command === 'add') {
    let item = process.argv[3];
    add(item);
} else if (command === 'delete') {
    let remove = process.argv[3];
    deleteItem(remove);
} else if (command === 'list') {
    process.argv[3];
    list();
} else if (command === 'reset') {
    resetAll();
} else if (command === 'update') {
    let index = process.argv[3];
    let newLine = process.argv[4];
    update(index, newLine);
} else if (command === 'help') {
    helpSection();
}

function helpSection() {
    fs.readFile('./help.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        console.error(data);
    });
}

function update(index, newLine) {
    fs.readFile('./data.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        let arrayData = data.split('\n');

        console.log(arrayData[index] + ' updated =>: ' + newLine);


        let split = [];
        arrayData.forEach((item) => {
            split.push(item + '\n');

            let replaceItem = split.toString().replace(arrayData[index - 1], newLine);

            fs.writeFile('./data.txt', replaceItem.replace(/,/g, ''), function(error) {
                if (error) {
                    console.log(error);
                }

            });
        });
    });
}

function deleteItem(remove) {
    fs.readFile('./data.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        let split = data.split('\n');
        console.log('removed: ' + split.splice(remove - 1, 1));
        let splicedWithNewLine = [];

        split.forEach((item) => {
            splicedWithNewLine.push(item + '\n');
            let removeComa = splicedWithNewLine.toString().replace(/,/g, '');

            fs.writeFile('./data.txt', removeComa, function(error) {
                if (error) {
                    console.log(error);
                }
            });
        });
    });

}

function resetAll() {
    fs.writeFile('./data.txt', '', function(error) {
        if (error) {
            console.error(error);
        } else {

            console.log('Removed all to-do items');
        }

    });
}


function list() {
    fs.readFile('./data.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        } else if (data.length === 0) {
            console.log('Today is no To-Do');
        } else {
            console.log(data)
        }

    });
}

function add(item) {
    let newTodo = [];

    let date = new Date().toLocaleDateString();

    newTodo.unshift(item + ' (added: ' + date + ' )');

    fs.appendFile('./data.txt', newTodo + '\n', function(error) {
        if (error) {
            console.error(error);
        }

    });
}