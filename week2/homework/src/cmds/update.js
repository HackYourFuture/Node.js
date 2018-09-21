'use strict';

const fs = require('fs');

exports.command = 'update [file] [todo]';
exports.desc = 'Remove todo';
exports.builder = {
    file: {
        default: './data.json'
    },
    todo: {
        alias: 't',
        demandOption: true,
        type: 'number'
    },
    newdo: {
        alias: 'n',
        demandOption: true
    }
};
exports.handler = argv => {
    const { file, todo, newdo } = argv;
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;

        let arrayOfObjects = JSON.parse(data);
        const key = ['todos'];
        const selection = arrayOfObjects[key].find(o => o.id === todo);
        if (selection === undefined) {
            console.log('There is no object with this key');
            console.log(arrayOfObjects);
        } else {
            selection.title = newdo;
            fs.writeFile(file, JSON.stringify(arrayOfObjects, null, 2), 'utf-8', err => {
                if (err) throw err;
                console.log('Done!');
                console.log(arrayOfObjects);
            });
        }
    });
};
