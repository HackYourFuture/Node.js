'use strict';

let express = require('express');
let app = express();
let uuidv4 = require('uuid/v4');
app.use(express.json());
const {
    readFile,
    writeFile
} = require('./todo.js');

const PORT = 3000;

app.get('/todos', (req, res) => {
    readFile()
        .then(data => {
            res.json(data);
            res.end();
        })
});

app.delete('/todos', (req, res) => {
    writeFile('')
        .then(() => console.log("LIST OF TODOS CLEARED!"))
        .then(() => readFile())
});

app.post('/todos/:id/done', (req, res) => {
    const trueId = req.params.id;
    readFile()
        .then(todo => {
            const newTodos = todo.find(todo => todo.id === trueId);
            newTodos.done = true;
            return writeFile(todo);
        })
        .then(() => {
            res.send(`${trueId} from todos list has DONE!`);
            res.end()
        })
});

app.delete('/todos/:id/done', (req, res) => {
    const falseId = req.params.id;
    readFile()
        .then(todos => {
            const newTodos = todos.find(todo => todo.id === falseId);
            newTodos.done = false;
            return writeFile(todos)
        })
        .then(() => {
            res.send(`${ falseId } from todos list has NOT DONE!`);
            res.end()
        })
});

app.listen(PORT, err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`server started at port : ${PORT}`);
    }
})