Added Abdullah

"use strict";

const fs = require('fs');
const TODOS_FILENAME = process.env["TODOS_FILENAME"] || "todos.json";
const helpFile = "help.txt";

let commandArgs = process.argv.slice(2);
let myTodoList = [];
let num = 1;


fs.readFile(TODOS_FILENAME, "utf8", (err, data) => {

    if (err) {
        //console.log(err);
        if (err.code === "ENDENT") {

            //No such File or directory
            console.log("i'm sorry, friend, but that file doesn't exist.");
        }
        else if (err.code === "EACCES") {
            console.log("That file exists but you don't have permission.");

        }
        else {

            console.log(`Uh oh, an unknown error occured ${err.message}`)
        }
        process.exit();

    }

    // console.log(`Successfully read the file: ${TODOS_FILENAME}`)

    myTodoList = JSON.parse(data);

    if (commandArgs[0] === "add") {

        addItem();
    }

    else if (commandArgs[0] === "help") {

        showHelpMenu();
    }
    else if (commandArgs[0] === "list") {

        showListMenu();
    }

    else if (commandArgs[0] === "remove" + num) {

        RemoveItems();
    }

    else if (commandArgs[0] === "reset") {

        RestAll();
    }
    else {

        showHelpMenu();
    }

    let myTodoListAsString = JSON.stringify(myTodoList);

    fs.writeFile(TODOS_FILENAME, myTodoListAsString, (err) => {

        if (err) throw err;
    })

})

function showHelpMenu() {

    fs.readFile(helpFile, "utf8", (err, data) => {

        console.log(data);
    })
}

function addItem() {

    myTodoList.push({

        message: commandArgs[1]

    })
    return console.log("Successfully added new object!")
}

function showListMenu() {

    return console.log(myTodoList);
}

function RemoveItems() {

    for (var index = 0; index <= myTodoList.length; index++) {

        num = myTodoList[0];


    }
    myTodoList.splice(num, 1);

    return console.log(myTodoList);

}

function RestAll() {

    myTodoList = [];

    return console.log("Successfully reset the todos.json")
}

