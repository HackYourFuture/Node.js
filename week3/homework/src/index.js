'use strict';
let express = require('express');
let app = express();
let uuid = require('uuid/v4')
app.use(express.json());
let { readFile, writeFile } = require('./todo.js');

app.get('/READ', (req, res) => {
    readFile('./todos.json').then((data) => {
        let newData = JSON.parse(data);

        for (let i = 0; i < newData.length; i++) {

            console.log(newData[i].name)

        }

    })
});
app.delete('/todos', (req, res) => {
    writeFile('./todos.json', []).then((data) => {
        console.log('deleted');
        return readFile('./todos.json');
    }).then((data) => {
        console.log(JSON.parse(data))
    })
})
app.post("/todos/:id/done", (req, res) => {
    let id = req.params.id;


    readFile('./todos.json').then((data) => {
        let newData = JSON.parse(data);
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id == id) {
                newData[i].done === true;
                writeFile('./todos.json', newData).then((DATA) => {
                    Console.log('done')
                })
            } else {
                res.send('not found')
            }
        }
    }).catch((err) => console.log(err))
})
app.delete('/todos', (req, res) => {
    writeFile('./todos.json', []).then((data) => {
        console.log('deleted');
        return readFile('./todos.json');
    }).then((data) => {
        console.log(JSON.parse(data))
    })
})
app.delete("/todos/:id/done", (req, res) => {
    let id = req.params.id;


    readFile('./todos.json').then((data) => {
        let newData = JSON.parse(data);
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id == id) {
                newData[i].done === false;
                writeFile('./todos.json', newData).then(() => {
                    Console.log('done')
                })
            } else {
                res.send('not found')
            }
        }
    }).catch((err) => console.log(err))
})

app.listen(3000, () => {
    console.log('server started on port 3000');

});


