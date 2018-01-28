const fs = require('fs');

const myArg = process.argv.slice(2);

let myList = myArg[0];

//else if (myList === 'add'){
//  addNewThingsTodo();
//}


function showHelp() {
    openFile('help.txt', function (error, data) {
        if (error) {
            return console.log('Error: the help file could not be displayed', error);
        }
        console.log(data);
    });
}
if (myList === 'help' || !myList) {
    showHelp();
} else if (myList === 'list') {
    listed();
} else {
    update()
}

function listed() {
    openFile('todo.txt', function (error, data) {
        if (error) {
            console.error(error)
        } else {
            console.log(data)
        }
    });
}
function writer(data, oldData) {
    if (data && !oldData) {
        fs.writeFile("todo.txt", data.join("\n"), (e) => {
            console.error(e)
        })
    } else if (!data) {
        fs.writeFile("todo.txt", data, (e) => {
            console.error(e)
        })
    } else {
        const container = oldData.split(",")
        container.push(data)
        fs.writeFile("todo.txt", container.join("\n"), (e) => {
            console.error(e)
        })
    }
}
function update() {
    let commandArgs = process.argv.slice(2);
    if (commandArgs[0] === "add") {
        let myTodoList = [];
        myTodoList.push();
        openFile("todo.txt", function (e, data) {
            writer(commandArgs[1], data);
        })
    } else if (commandArgs[0] === "remove") {
        openFile("todo.txt", function (e, data) {
            let items = data.split("\n")
            items.splice(Number(commandArgs[1]) - 1, 1)
            writer(items)

        })
    } else if (commandArgs[0] === "reset") {
        openFile("todo.txt", function (e, data) {
            writer("")

        })
    } else if (commandArgs[0] === "update") {
        openFile("todo.txt", function (e, data) {
            let items = data.split("\n")
            items.splice(Number(commandArgs[1]) - 1, 1, commandArgs[2])
            writer(items)

        })
    } // update()
    
}
function openFile(fileName, callback) {
    fs.readFile(__dirname + '/' + fileName, 'utf8', function (error, data) {
        callback(error, data);
    })
}