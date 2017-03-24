const fs = require('fs');

const options = process.argv.slice(2);

let command = options[0];

switch (command) {
    case 'help':
    default:
        showHelp();
        break;
    case 'add':
        addToDo();
        break;
    case 'remove':
        removeToDo();
        break;
    case 'update':
        updateToDo();
        break;
    case 'reset':
        resetToDos();
        break;
    case 'list':
        listToDos();
        break;
}

function splitStringByNewline(string) {
    return string.split('\n').filter((element) => {
        element = element.trim();
        return element.length > 0;
    });
}

function showHelp() {
    openFile('help.txt', (error, instructions) => {
        if (error) {
            return console.log('Error: the help file could not be displayed', error);
        }
        console.log(instructions);
    });
}

function addToDo() {
    let task = process.argv.slice(3);
    if (task == '') {
        console.log(`Please enter a task which to be added to your ToDos List!`);
    } else {
        fs.appendFile('./todo.txt', task.join(' ') + '\n', (err) => {
            if (err) throw err;
            console.log(`The task: ${task.join(' ')} was added to your ToDos List \n`);
            listToDos()
        });
    }
}

function removeToDo() {
    let task = process.argv.slice(3);
    if (task == '' || task == '0') {
        return console.log(`Please enter a task number to be deleted`);
    }
    openFile('./todo.txt', (err, toDos) => {
        if (err) throw err;

        var toDo = toDos.split('\n');
        toDo.splice(task - 1, 1);

        if (task > toDo.length) {
            return console.log("Task is not found");
        }
        console.log(`Task ${task} was successfuly deleted \n`);
        updatedTodos = toDo.join('\n');

        fs.writeFile('./todo.txt', updatedTodos, err => {
            if (err) throw err;
            listToDos()
        });
    });
}

// Thank you Jim for your guidance
function updateToDo() {
    let todoIndex = process.argv[3];
    let task = process.argv[4];

    openFile('./todo.txt', (err, toDos) => {
        if (err) throw err

        let tasks = toDos.split('\n');

        if (isNaN(todoIndex) || todoIndex < 1 || todoIndex > tasks.length) {
            return console.log(`Please enter a valid task number to be updated`);
        }
        tasks[todoIndex - 1] = task;
        toDos = tasks.join('\n');

        fs.writeFile('./todo.txt', toDos, err => {
            if (err) throw err
            console.log(`Tasks was updated successfuly \n`)
            listToDos()
        })
    })
}


function resetToDos() {
    fs.truncate('./todo.txt', 0, (err) => {
        if (err) throw err;
        console.log('Your ToDos list has been reseted')
    });
}

function listToDos() {
    openFile('todo.txt', (error, toDos) => {
        if (error) {
            if (error.code === 'ENOENT') {
                return console.log('Nothing to do yet!');
            } else {
                return console.log('Error: Something went wrong', error);
            }
        }

        var todos = splitStringByNewline(toDos);

        if (todos.length === 0) {
            return console.log('Nothing to do!')
        }

        console.log('Your todo list looks like this');
        todos.forEach((element, index) => {
            index = (index + 1).toString();
            console.log(index, element);
        });

        if (todos.length > 5) {
            console.log('You have too much to do!');
        }
    });
}


// File I/O

function getTodosFromFile(callback) {
    openFile('todo.txt', (error, data) => {
        if (error) {
            if (error.code === 'ENOENT') {
                return console.log('Nothing to do! (or your dog ate your todo list)');
            } else {
                return console.log('Error: Something went wrong', error);
            }
        }

        var todos = splitStringByNewline(data);
        callback(todos);
    });
}

function openFile(fileName, callback) {
    fs.readFile(__dirname + '/' + fileName, 'utf8', (error, data) => {
        callback(error, data)
    });
}

function writeToFile(fileName, contents, callback) {
    fs.writeFile(__dirname + '/' + fileName, contents, (error) => {
        callback(error)
    });
}