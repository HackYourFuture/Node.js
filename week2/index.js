let fs = require("fs");

if (process.argv[2] === "help") {
    console.log(`You may use below functions ==>\n
            1) add "string" - to add another item to the todo list  \n
            2) remove index - to remove a specific(index) item on the list \n
            3) reset - to reset the todo list \n
            4) list - to list the items in the todo list\n
            5) update index "string"- to update a specific(index) item on the list to "string"`);
}

if (process.argv[2] === "list") {
    fs.readFile("./list.txt", "UTF-8", function (err, contents) {

        if (err) console.log(err);
        console.log("\nHere is the list \n" + contents);
    });
}

if (process.argv[2] === "add") {
    let addContent = "\n" + process.argv[3].toString();
    fs.appendFileSync("./list.txt", addContent);
    fs.readFile("./list.txt", "UTF-8", function (err, contents) {

        if (err) console.log(err);
        console.log("\nHere is the new list\n" + contents);
    });
}

if (process.argv[2] === "remove") {
    let index = +(process.argv[3]) - 1;
    fs.readFile("./list.txt", "UTF-8", function (err, contents) {

        if (err) console.log(err);
        let result = contents.split("\n");
        result.splice(index, 1);
        let text = result.join("\n");
        console.log("\nHere is the new list\n" + text);
        fs.writeFile("./list.txt", text);
    });
}

if (process.argv[2] === "update") {
    let index = +(process.argv[3]) - 1;
    let replaceItem = process.argv[4];
    fs.readFile("./list.txt", "UTF-8", function (err, contents) {

        if (err) console.log(err);
        let result = contents.split("\n");
        result.splice(index, 1, replaceItem);
        let text = result.join("\n");
        console.log("\nHere is the new list\n" + text);
        fs.writeFile("./list.txt", text);
    });
}

if (process.argv[2] === "reset") {
    let addContent = "1) A\n2) B\n3) C"
    fs.writeFileSync("./list.txt", addContent);
    fs.readFile("./list.txt", "UTF-8", function (err, contents) {

        if (err) console.log(err);
        console.log("\nHere is the base list\n" + contents);
    });
}