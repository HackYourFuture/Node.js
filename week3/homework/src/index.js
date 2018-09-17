'use strict';

const fs = require('fs');
const express =  require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get(/^\/todos$/, (request, response) => {
    list(response);
    response.status(200);
}); 

app.post(/^\/todos$/, (request, response) => {
    add(request.body.todo);
    response
        .status(201)
        .json({status: "success"});  
});

app.put(/^\/todos\/([1-9][0-9]*)$/, (request, response) => {
    update(request.params[0], request.body.todo.description);
    response
        .status(200)
        .json({status: "success"}); 
});

app.delete(/^\/todos\/([1-9][0-9]*)$/, (request, response) => {
    remove(request.params[0]);
    response
        .status(200)
        .json({status: "success"}); 
});

app.get(/^\/todos\/([1-9][0-9]*)$/, (request, response) => {
    getTask(request.params[0], response);
    response
        .status(200);
});

app.delete(/^\/todos$/, (request, response) => {
    reset();
    response
        .status(200)
        .json({status: "success"}); 
});

app.post(/^\/todos\/([1-9][0-9]*)\/done$/, (request, response) => {
    update(request.params[0], null, true);
    response
        .status(200)
        .json({status: "success"}); 
});

app.delete(/^\/todos\/([1-9][0-9]*)\/done$/, (request, response) => {
    update(request.params[0], null, false);
    response
        .status(200)
        .json({status: "success"}); 
});

app.listen(3030);

function writeToFile(buffer){
	fs.writeFile('to-do.json', buffer, function(error, data){
		if(error){
			throw Error(error);
		}
	});
}

function getData(processData){
	fs.readFile('to-do.json', 'utf8', function(error, data) {
		if(error){
			throw Error(error);
		}
		else{
			processData(JSON.parse(data));
		}
	});
}

function add(task){
	getData(function(toDoData){
        toDoData.count++;
        if(!task.done){
            task.done = false;
        }
        toDoData.tasks.push(task);
		writeToFile(JSON.stringify(toDoData, null, 2));
	});
}

function list(response){
	getData(function(toDoData){
		response.json(toDoData.tasks);
	});
}

function getTask(index, response){
    getData(function(toDoData){
		response.json(toDoData.tasks[index - 1]);
	});
}

function remove(index){
	getData(function(toDoData){
        if(index <= toDoData.count){ 
            toDoData.tasks.splice(index - 1, 1);
            toDoData.count--;
            writeToFile(JSON.stringify(toDoData, null, 2));
        }
	});
}

function reset(){
	getData(function(toDoData){
		toDoData.tasks = [];
		toDoData.count = 0;
		writeToFile(JSON.stringify(toDoData, null, 2));
	});
}

function update(index, description, done){
	getData(function(toDoData){
        if(index <= toDoData.count){ 
            if(description != null){
                toDoData.tasks[index - 1].description = description;
            }
            if(done != null){
                toDoData.tasks[index - 1].done = done;
            }
            writeToFile(JSON.stringify(toDoData, null, 2));
        }
	});
}
