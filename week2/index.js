
const fs = require('fs');
const readline = require('readline');
let todos = [];


if (process.argv[2] !== undefined) {
    start();
} else {
    console.log('Please specify an option to use, here is the manual\n');
    manualReader('./help.txt');
}


function start() {
    switch (process.argv[2].trim().toLowerCase()) {
        case 'help':
            manualReader('./help.txt');
            break;
        case 'add':
            checkFileContent().then((item) => addTodoItem(item)).catch((err) => console.log(err));
            break;
        case 'remove':
            itemRemover(process.argv[3]);
            break;
        case 'list':
            console.log('The items on your todo list: ');
            todoFileReader('./todos.txt');
            break;
        case 'reset':
            itemsResetter();
            break;
        default:
            console.log('No such option! Take a look at the manual\n');
            manualReader('./help.txt');
            break;
    }
}


function manualReader(fileName) {
    fs.readFile(fileName, 'UTF-8', (err, data) => {
        console.log(data);
    });
}

//  display the todo file once called
function todoFileReader(fileName) {
    fs.exists(fileName, (exists) => {
        //see if file exists to add the existing items to the array
        if (exists) {
            fs.readFile(fileName, 'UTF-8', (err, data) => {
                if (data === "") {
                    console.log('There are no items yet, try using \'node index.js add "some todo item"\'');
                    return;
                }
                data = data.split('\r\n');
                let text = data.reduce(((last, item, index) => last += `${index + 1}. ${item}\n`), ``);
                console.log(text);
            });
        } else {
            console.log('There are no items yet, try using \'node index.js add "some todo item"\'');
        }
    });
}



//check if there's already a file and to push the item in

function checkFileContent() {
    return new Promise(function (resolve, reject) {
        fs.exists('./todos.txt', (exists) => {
            if (!exists) {
                resolve(process.argv[3]);
                return;
            }
            fs.readFile('todos.txt', 'UTF-8', (err, data) => {
                todos = data.trim().split('\r\n');
                resolve(process.argv[3]);
            });
        });
    });
}

//add the new item to the array
function addTodoItem(todoItem) {
    if (todoItem !== '') {
        if (todoItem.trim() !== '') {
            todos.push(todoItem.trim());
            todosWriter(todos);
        }
    } else {
        console.log('Not the correct usage! Try "node index.js help"');
    }
}

// rewrite existing file with new todos array 
function todosWriter(itemsArr) {
    itemsArr.filter((a) => a !== '');
    fs.writeFile('./todos.txt', itemsArr.join('\r\n'), 'UTF-8', (err) => {
        if (err) console.log(err);
    });
}

//make the list empty
function itemsResetter() {
    fs.writeFile('./todos.txt', '', (err) => {
        if (err) console.log(err);
    });
    console.log('the todo list is empty ');
}




//remove item using index
function itemRemover(index) {
    //if index was actually filled in
    if (index !== undefined) {
        index = parseInt(index) - 1;
        fs.readFile('./todos.txt', 'UTF-8', (err, data) => {
            data = data.split('\r\n');
            //if that index actually existed in the todo list
            if (data[index] !== undefined) {
                data.splice(index, 1);
                todosWriter(data);
                return;
            }
            console.log('error the line that you specified is not exist');
        });
    } else {
        console.log('Not the correct command! Try "node index.js help"');
    }
}
