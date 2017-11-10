let fs = require("fs");

if (process.argv[2] === "help") {
    console.log(`You may use below functions ==>\n
            1) add "string" - to add another item to the todo list  \n
            2) remove index - to remove a specific(index) item on the list \n
            3) reset - to reset the todo list \n
            4) list - to list the items in the todo list\n
            5) update index "string"- to update a specific(index) item on the list to "string"`);
}

let todo = []
if (process.argv[2] === "list") {
    fs.readFile("./todo.json", "UTF-8", function (err, contents) {

        if (err) console.log(err);
        todo = JSON.parse(contents)
        for (i of todo) console.log(i.item);
    });
}

if (process.argv[2] === "add") {
    fs.readFile("./todo.json", "UTF-8", function (err, contents) {

        if (err) console.log(err);
        todo = JSON.parse(contents)
        let addContent = { item: process.argv[3].toString() };
        todo.push(addContent);
        fs.writeFile('./todo.json', JSON.stringify(todo));
    });
}
if (process.argv[2] === "remove") {

    if (isNaN(process.argv[3])) console.log("Please specify a number ");
    else {
        let index = +(process.argv[3]) - 1;
        fs.readFile("./todo.json", "UTF-8", function (err, contents) {

            if (err) console.log(err);
            todo = JSON.parse(contents);
            todo.splice(index, 1);
            fs.writeFile('./todo.json', JSON.stringify(todo));
        });
    }
}

if (process.argv[2] === "update") {

    if (isNaN(process.argv[3])) console.log("Please specify a number ");
    else {
        let index = +(process.argv[3]) - 1;
        let replaceItem = process.argv[4];
        fs.readFile("./todo.json", "UTF-8", function (err, contents) {

            if (err) console.log(err);
            todo = JSON.parse(contents);
            todo[index] = { item: replaceItem.toString() };
            fs.writeFile('./todo.json', JSON.stringify(todo));
        });
    }
}

if (process.argv[2] === "reset") {
    let initialContent = [{"item":"A"},{"item":"B"},{"item":"C"}];
    fs.writeFile('./todo.json', JSON.stringify(initialContent));
}