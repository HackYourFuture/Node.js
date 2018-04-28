const {
    appendFile,
    readFile,
    writeFile
} = require('fs');

const {
    promisify
} = require('util');

const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

//add to the file
async function add(PATH, encode, args) {
    const data = await readFileWithPromise(PATH, encode).catch(() => '[]');
    const todos = JSON.parse(data);
    const newTodo = args.join(' ');
    todos.push(newTodo);
    await writeFileWithPromise(PATH, JSON.stringify(todos));
}

async function reset(PATH) {
    await writeFileWithPromise(PATH, JSON.stringify([]));
    const data = await readFileWithPromise(PATH, 'utf8').catch(() => '[]');
    const todos = JSON.parse(data);
    console.info('To-dos:', todos);
}

//remove one or multiple items from the file
async function remove(PATH, args) {
    const data = await readFileWithPromise(PATH, 'utf8').catch(() => '[]');
    const todos = JSON.parse(data);

    args.sort((a, b) => {
        return b < a
    });

    for (let i = args.length - 1; i > -1; i--) {
        if (args[i] > -1) {
            todos.splice(args[i] - 1, 1);
        }
    };
    await writeFileWithPromise(PATH, JSON.stringify(todos));
}

async function update(PATH, indexToBeUpdated, updateTO) {
    const data = await readFileWithPromise(PATH, 'utf8').catch(() => '[]');
    const todos = JSON.parse(data);

    if (indexToBeUpdated > -1) {
        todos[indexToBeUpdated - 1] = updateTO.join(" ");
    } else {
        console.log("invalid index");
    }
    await writeFileWithPromise(PATH, JSON.stringify(todos));
}

//List the current file
async function list(PATH) {
    const data = await readFileWithPromise(PATH, 'utf8').catch(() => '[]');
    const todos = JSON.parse(data);
    console.info(todos);
}

module.exports = {
    add,
    reset,
    remove,
    list,
    update
};