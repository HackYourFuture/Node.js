

const fs = require('fs');

if (process.argv[2] === "list") {
    fs.readFile('./todos.txt', "utf-8", (err, data) => {
        console.log(data);
    });
}if (process.argv[2] === "add") {
        fs.appendFile('./todos.txt', process.argv[3] + "\n", (err) => {
        if (err) throw err;

    });
}if (process.argv[2] === "remove") {
    let remove = +(process.argv[3]) - 1;
    fs.readFile("./todos.txt", "UTF-8", (err, contents)=> {
        if (err) throw err;
        let outcome = contents.split("\n");
        outcome.splice(remove, 1);
        let text = outcome.join("\n");
            console.log(text);
        fs.writeFile("./todos.txt", text);
    });
}else if (process.argv[2] === "reset") {
    let removeAll = ""
    fs.writeFileSync("./todos.txt", removeAll);
    fs.readFile("./todos.txt", "UTF-8", (err, contents)=> {
        if (err) throw err;
            console.log(contents);
        });
    };