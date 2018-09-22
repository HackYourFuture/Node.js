'use strict';

const fs = require('fs');
const storageFile = 'todo.json';

function showTodoList(itemId) {
    return new Promise ((resolve, reject) => {
        // check if json file existed or not 
        if(!fs.existsSync(storageFile)) {
            fs.appendFile(storageFile, '[]', error => console.log('todo.json file was not existed but now created'));
        }
            fs.readFile(storageFile, (error, data) => {
                if(itemId) {
                    console.log('id existed');
                    if(error) reject(error);
                    else {
                        let item = data.filter(e => e.id === itemId); // JSON.parse()
                        resolve(item);
                    }
                } else {
                        error ? reject(error) : resolve(data);
                }
            });
    });
}

function todoRender(res, req, itemId) {
    showTodoList(itemId)
        .then(data => {
            if (data == '[]') {
                res.status(404).json({ message: "no data found" });
            }else {
                const todosData = JSON.parse(data);
                res.status(200).json(todosData);
            }
        })
        .catch(error => console.log(error));
}

function clearTodos(res) {
    fs.writeFile(storageFile, '[]', (error) => {
        if(error) console.log(error);
    });
    res.status(200).json({ message: "file erased" });
}

function addTodoItem(req, res) {
    const newItem = {
        id: req.body.id,
        myTask: req.body.myTask,
        done: req.body.done
    };
    showTodoList()
        .then(data => {
            const todosItems = JSON.parse(data);
            todosItems.push(newItem);
            console.log(todosItems);
            fs.writeFile(storageFile,  JSON.stringify(todosItems), (error) => {
                if(error) console.log(error);
            });
        })
        .catch(error => console.log(error));
    res.status(200).json({ success: "file Added!" });
}

function markUpdate(req, res, idValue, done) {
    showTodoList()
        .then(data => {
            const todosItems = JSON.parse(data);
            //const wantedItem = todosItems.filter(item => item.id === value);
            const index = todosItems.findIndex(item => item.id === idValue);
            todosItems[index].done = done;
            console.log('after update', todosItems);
            fs.writeFile(storageFile,  JSON.stringify(todosItems), (error) => {
                if(error) console.log(error);
            });
        })
        .catch(error => console.log(error));
    res.status(200).json({ done: "value updated" });
}

module.exports = {showTodoList, todoRender, clearTodos, addTodoItem, markUpdate};