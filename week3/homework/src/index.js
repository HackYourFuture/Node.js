const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express ();
app.use(bodyParser.json());
const reading = ()=>{
    fs.readFile('./todo.json','utf8',function(error,data){
        if(error){
            throw new Error(error)
        }
        if (Object.values(toDoList),length === 0) {
           return response.end('The ToDo list is empty')  
        }
        const toDoList = JSON.parse(data);
    });
    return toDoList;
};
const writing =(toDoList)=>{
    fs.writeFile('./todo.json', JSON.stringify(toDoList), function (error) {
        if (error) {
          throw error;
        }
      });
}

app.get('/list', (request,response) => {
    //list
    reading();
    response
        .status(200)
        .json(toDoList)
});

app.get('/list/:id',(request,response) =>{
    reading();
    const index = request.params.id;
    if(isNaN(index) !== true){
       return response.end('You have entered not a number as item id');
    };
    response
        .status(200)
        .json(toDoList[index])
})

app.post('/add/:item', (request, response)=>{             
    //add 
   reading();
    const newItem = {
        'index': myToDoList.length,
        'description': request.params.item
    }
    toDoList.push(newItem);
    writing(toDoList);
    response
        .status(201)
        .json(toDoList)
    });
app.delete('/delete', function (request, response){
    fs.writeFile('./todo.json', '[]', function (error) {
        if (error) {
          throw error;
        }
    response
        .status(204)
        .end('The list has been wiped out!')
      });
})
app.post('/mark/:id/done', function (request, response) {
    reading();
    toDoList[request.params.id].done = "true";
    writing(toDoList);
    response.end(`You have marked the item ${request.params.id} as done. `)
});
app.listen(3000);