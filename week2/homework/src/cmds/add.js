'use strict';

const fs = require('fs');

exports.command = 'add [file] [todo]';
exports.desc = 'Add object to file';
exports.builder = {
    file: {
        default: './data.json'
    },
    todo: {
        alias: 't',
        demandOption: true,
        type: 'string'
    }
};
exports.handler = function (argv) {
    const { file, todo } = argv;
    const time = new Date().toUTCString();

    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;

        const arrayOfObjects = JSON.parse(data);
        let lastObject = Object.values(arrayOfObjects.todos)[Object.values(arrayOfObjects.todos).length - 1];
        let counter = 0;
        if (lastObject === undefined) {
            counter;
        } else {
            counter = parseInt(lastObject.id) + 1;
        }

        arrayOfObjects.todos.push({
            title: todo,
            timestamp: time,
            id: counter
        });

        fs.writeFile(file, JSON.stringify(arrayOfObjects, null, 2), 'utf-8', err => {
            if (err) throw err;
            console.log(arrayOfObjects);
        });
    });
};
