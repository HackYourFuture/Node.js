'use strict';

const fs = require('fs');

const command = process.argv[2];
const command2 = process.argv[3];
const command3 = process.argv[4];

function add(item, toDoList) {
    if (item === undefined) {
        console.log('please write something to do')
    } else {
        const itemObj = {
            index: toDoList.length + 1,
            description: item
        };
        toDoList.push(itemObj);

        fs.writeFile('./to-do.json', JSON.stringify(toDoList), (error) => {
            if (error) { console.log(error); }
        });
    }
}

function list(toDoList) {
    if (toDoList.length === 0) {
        const warningMessage = 'your to-do list is empty, you can plan your day now!';
        console.log(warningMessage);
    } else {
        toDoList.forEach(item => {
            console.log(`${item.index}. ${item.description}`);
        });
    }
}

function remove(index, toDoList) {
    let actualIndex = parseInt(index) - 1;

    if (actualIndex < 0 || actualIndex > toDoList.length || index === undefined) {
        const warningMessage = 'the index you typed does not already exist!';
        console.log(warningMessage);
    } else {
        toDoList.splice(actualIndex, 1);
        toDoList.forEach(item => item.index = toDoList.indexOf(item) + 1);
    }

    fs.writeFile('./to-do.json', JSON.stringify(toDoList), (error) => {
        if (error) { console.log(error); }
    });
}

function reset() {
    fs.writeFile('./to-do.json', '[]', (error) => {
        if (error) { console.log(error); }
    });;
}

function update(index, newLine, toDoList) {
    if (toDoList >= index && index > 0) {
        toDoList[index - 1].description = newLine;

        fs.writeFile('./to-do.json', JSON.stringify(toDoList), (error) => {
            if (error) { console.log(error); }
        });
    } else {
        const warningMessage = 'the index you typed does not already exist!';
        console.log(warningMessage);
    }
}

function help(topic) {
    const allDescription = {
        addDescription: '<add> command\nnode index.js add "work hard" : Adds a to-do item. All the words behind add are entered as one to-do item to the list. But please use quotation marks to add more than one word!',
        listDescription: '<list> command\nnode index.js list : Shows current to-dos, or shows an appropriate text if there are no to-dos',
        removeDescription: '<remove> command\nRemoves a to-do item by its 1-base index, e.g. to remove second item, execute: node index.js remove 2',
        resetDescription: '<reset> command\nnode index.js reset : Removes all to-do items from the list. Please think twice while using this command',
        updateDescription: '<update> command\nUpdates a to-do item with new text: node index.js update 3 "Brush teeth"',
        helpDescription: '<help> command\nnode index.js help : lists all the commands and a short description for each of them. If you type a specific command after help, it will display the information about that command.'
    }

    const anythingDescription = 'You can get help by using "node index.js" command';

    if (topic === undefined) {
        Object.values(allDescription).forEach(e => console.log(e + '\n'));
    } else if (Object.keys(allDescription).includes(`${topic}Description`)) {
        console.log(allDescription[`${topic}Description`]);
    } else {
        console.log(anythingDecription);
    }
}

function switchCommands(command, command2, command3, toDoList) {
    switch (command) {
        case 'add':
            add(command2, toDoList);
            break;

        case 'list':
            list(toDoList);
            break;

        case 'remove':
            remove(command2, toDoList);
            break;

        case 'reset':
            reset();
            break;

        case 'update':
            update(command2, command3, toDoList);
            break;

        case 'help':
            help(command2);
            break;

        case undefined:
            help(undefined);
            break;

        default:
            help('other');
    }
}

fs.readFile('./to-do.json', 'utf8', (err, data) => {
    if (err) {
        if (err.errno === -4058) {
            fs.appendFile('./to-do.json', '[]', (error) => {
                if (error) { console.log(error); }

                fs.readFile('./to-do.json', 'utf8', (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        const toDoList = JSON.parse(data);
                        switchCommands(command, command2, command3, toDoList);
                    }
                });
            });
        } else {
            console.log(err);
        }
    } else {
        const toDoList = JSON.parse(data);
        switchCommands(command, command2, command3, toDoList);
    }
});
