const express = require('express');

const app = express();

const fs = require ('fs');

const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true }))

//help

app.get('/help', (request, response) => {

    response.write("\nyou asked for Help and I can't help you now.\n")
    response.end();
    console.log(`got a ${request.method} request for ${request.url}`);
    
})

//create new item

app.post('/create/:newitem', (request, response) => { 

    let newItem = request.params.newitem; //getting the posted parameter

    fs.readFile("./data/todo.json", "UTF-8", (err, data)=> {
        if (err) throw err;
        todo = JSON.parse(data);
        let template = { item : newItem };
        todo.push(template);
        fs.writeFileSync("./data/todo.json", JSON.stringify(todo));
    })
    response.send(`you added ${newItem} to the list`);
    console.log(`got a ${request.method} request for ${request.url}`);

})

app.get('/list', (request, response) => {

    fs.readFile("./data/todo.json", "UTF-8", (err, data)=>{
        if (err) throw err;
        todo = JSON.parse(data);
        
        for (i of todo) response.write(`\n ${i.item}`);
        response.end();
        console.log(`got a ${request.method} request for ${request.url}`);

    })

})

app.delete('/delete/:id', (request, response) => {

    let deleteItem = request.params.id;
    fs.readFile("./data/todo.json", "UTF-8", (err, data)=>{
        if (err) throw err;
        let todo = JSON.parse(data);
        todo.splice(deleteItem - 1 , 1);
        console.log(`you removed item ${deleteItem}`);
        fs.writeFileSync("./data/todo.json",JSON.stringify(todo));

        response.json(todo);
        response.end();
    })

})

//update is not working yet
//app.put('/update', (request, response) => {

//    let itemId = request.params.id;
//    let newTodo = request.params.newtodo;

//    fs.readFile('./data/todo.json', 'UTF-8', (err, data) =>{
//       if (err) throw err;

//        let oldTodo = JSON.parse(data);
//    })
//})


app.listen(3000);
console.log('server is listening on port 3000');
