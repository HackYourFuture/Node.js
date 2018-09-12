'use strict';

const fs = require('fs');

const command = process.argv[2];
const command2 = process.argv[3];
const command3 = process.argv[4];

fs.readFile('./to-do.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const toDoList = JSON.parse(data);

        switch (command) {
            case 'add':
                add(command2);
                break;

            case 'list':
                list();
                break;

            case 'remove':
                remove(command2);
                break;

            case 'reset':
                reset();
                break;

            case 'update':
                update(command2, command3);
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

        function add(item) {
            const listIndex = Object.keys(toDoList).length + 1;
            toDoList[listIndex] = item;

            fs.writeFile('./to-do.json', JSON.stringify(toDoList), (error) => {
                if (error) { console.log(error); }
            });
        }

        function list() {
            if (Object.keys(toDoList).length === 0) {
                const warningMessage = 'your to-do list is empty, you can plan your day now!';
                console.log(warningMessage);
            } else {
                Object.keys(toDoList).forEach(e => {
                    console.log(`${e}. ${toDoList[e]}`);
                });
            }
        }

        function remove(index) {
            let actualIndex = parseInt(index) - 1;
            const toDoArr = Object.values(toDoList);

            if (actualIndex < 0 || actualIndex > toDoArr.length) {
                const warningMessage = 'the index you typed does not already exist!';
                console.log(warningMessage);
            } else {
                const newToDoArr = toDoArr.filter(e => actualIndex !== toDoArr.indexOf(e));
                const newToDoList = {};
                for (let i = 0; i < newToDoArr.length; i++) {
                    newToDoList[`${i + 1}`] = newToDoArr[i];
                }

                fs.writeFile('./to-do.json', JSON.stringify(newToDoList), (error) => {
                    if (error) { console.log(error); }
                });
            }
        }

        function reset() {
            fs.writeFile('./to-do.json', '{}', (error) => {
                if (error) { console.log(error); }
            });;
        }

        function update(index, newLine) {
            if (Object.keys(toDoList).includes(index)) {
                toDoList[index] = newLine;

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
                addDescription: 'node index.js add "work hard" : Adds a to-do item. All the words behind add are entered as one to-do item to the list. But please use quotation marks to add more than one word!',
                listDescription: 'node index.js list : Shows current to-dos, or shows an appropriate text if there are no to-dos',
                removeDescription: 'Removes a to-do item by its 1-base index, e.g. to remove second item, execute: node index.js remove 2',
                resetDescription: 'node index.js reset : Removes all to-do items from the list. Please think twice while using this command',
                updateDescription: 'Updates a to-do item with new text: node index.js update 3 "Brush teeth"',
                helpDescription: 'node index.js help : lists all the commands and a short description for each of them. If you type a specific command after help, it will display the information about that command.'
            }

            const anythingDescription = 'You can get help by using "node index.js" command';

            if (topic === undefined) {
                Object.values(allDescription).forEach(e => console.log(e + '\n'));
            } else if (Object.keys(allDescription).includes(`${topic}Description`)) {
                console.log(allDescription[`${topic}Description`]);
            } else {
                console.log(anythingDescription);
            }
        }
    }
});
