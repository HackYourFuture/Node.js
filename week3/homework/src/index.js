'use strict';

const express = require('express')
const app = express()
const port = 3000;
const fs = require('fs');
const uuid = require('uuid/v4');
const bodyParser = require("body-parser");


app.use(bodyParser.json());



app.get('/todos', (request, response) => {
  fs.readFileSync('./todo.txt', 'utf8', function (error, data = []) {
    if (error) {
      console.log(error)
    } else {
      response
        .json({ 'to Do List': data.split('\n') })
    }
  })

});

app.get('/todos/:id', (request, response) => {
  const id = uuid();
  fs.readFileSync('./todo.txt', 'utf8', function (error, data = []) {
    if (error) {
      console.log(error)
    } else {
      response
      const split = data.split('\n')
        .json({ 'to Do List': split[id] })
    }
  })

});

app.delete('/delete', (request, response) => {
  const id = uuid();
  fs.writeFileSync('./todo.txt', '', function (error) {
    if (error) {
      console.log(error)
    } else {
      response
        .json({ 'to Do List': 'ToDos are removed' })
    }
  })

});

app.post('/todo', (request, response) => {
  fs.readFile('./todo.txt', 'utf8', (error) => {
    if (error) {
      console.error(error);
    }

    const newTodo = [];
    newTodo.push(request.body[0].task);

    fs.appendFile('./todo.txt', newTodo + '/' + 'done: ' + false + '\n', (error) => {
      if (error) {
        console.error(error);
      }
    })
    response
      .json({ 'new Task added': newTodo });

  })
});

app.post('/todos/:id/done', (request, response) => {
  let id = uuid();
  fs.readFile('./todo.txt', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const dataSplit = data.split('\n')
      const switchStatus = dataSplit[id - 1].replace('done: ' + false, 'done: ' + true);
      const split = [];
      dataSplit.forEach((item) => {
        split.push(item + '\n');
        let value = split.toString().replace(dataSplit[id - 1], switchStatus);
        fs.writeFile('./todo.txt', value.replace(/,/g, ''), (error) => {
          if (error) {
            console.error(error);
          }
        })
      })
    }
    response
      .status(201)
      .json({ result: 'ok' });
  });
})

app.delete('/todos/:id/done', (request, response) => {
  fs.readFile('./todo.txt', 'utf8', (error) => {
    if (error) {
      console.error(error);
    }
    const newTodo = []
    newTodo.push(request.body[0].task);
    fs.appendFile('./todo.txt', newTodo + '/' + 'done: ' + false + '\n', (error) => {
      if (error) {
        console.error(error);
      }
    })
    response
      .json({ 'new Task added': newTodo });

  })
});
///////////////////
// console.log('incoming request');
// response.write('something');
// response.end();







// app.post("/todos", (req, res) => {
//   console.log(req.body);
//   todoActions.add(req.body.todo.description);
//   res.send("ok");
// });

// app.get('/profile/:id/:action', (req, res) => {
//   const id = req.params.id;
//   const action = req.params.action;
// })







app.listen(port, () => console.log(`Example app listening on port ${port}!`))