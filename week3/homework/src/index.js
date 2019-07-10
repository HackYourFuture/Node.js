'use strict';

// TODO: Write the homework code in this file
const express = require ('express');
const app = express();
let todos = require('./todos')



app.get('/', (req, res) => res.json(todos));


app.get('/todos/:id', (req, res) => {
    const found = todos.find(todo => {
        return todo.id === parseInt(req.params.id);
    });

    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404);
        res.send({ msg: '404 Not found'});
    }
});

app.delete('/todos', (req, res) => {
    let found = todos.find(todo => {
      return todo.id === parseInt(req.params.id);
    });
  
    if (found) {
      let targetIndex = todo.indexOf(found);
      todo.splice(targetIndex, 1);
      todos = [];
    }
    res.status(200);
    res.send([]).json()

  });

  app.post('/todos/:id/done', (req, res) => {
     const todoItem = todos.find(item => item.id === Number(req.params.id))
     todoItem.done = true;
     todos = todos.map(item => {
         if (todoItem.id === item.id) {
            return todoItem
         }
         return item
     })
     res.send(todos)
  });

app.delete('/todos/:id/done', (req, res) => {
    let todoItem = todos.find(item => item.id === Number(req.params.id))
     todoItem.done = false;
     todos = todos.filter(item => {
         if (todoItem.id === item.id) {
            return todoItem
         }
         return item
     })
     res.status(200)
     res.send(todos)
});


app.listen(8080, () => console.log(`sever listening on port...`));