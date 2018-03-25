'use strict';

const express = require('express');
const app = express();
app.use(express.json());

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
        .then(() => console.log("TODOS LIST CLEARED!"))
        .then(() => readFile())
});

const fs = require('fs');
const path = './mydata.json';

function writeFile(data) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(path, `${JSON.stringify(data)}\n`, (err, data) => err ? reject(err) : resolve(data))
        });
}

function readFile() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(path, (err, data) => resolve(err ? [] : JSON.parse(data.toString())))
        })
}


app.listen(PORT, err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`server started at port : ${PORT}`);
    }
})