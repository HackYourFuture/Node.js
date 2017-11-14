/* jshint esnext:true */
// use strict

const fs = require('fs');



//////////////////////////////////////////Helping functions
let fileReaderAndParse = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'UTF-8', (err, data) => {
            if (err) console.log(err);
            resolve(JSON.parse(data));
        });
    });
};

let fileWriter = (fileName, jsonData) => {
    fs.writeFile(fileName, JSON.stringify(jsonData, undefined, 4), (err) => {
        if (err) throw err;
    });
};
////////////////////////////////////////////End helping functions






/////////////////////////////////////////////////Rendering stuff
let renderManual = (req, res) => {
    fileReaderAndParse('help.json')
    .then((jsonData) => res.json(jsonData).end())
    .catch((err) => console.log(err));
};


let listTodos = (request, response) => {
    fileReaderAndParse('./todos.json')
    .then((data) => response.json(data).end())
    .catch((err) => console.log(err));
};
///////////////////////////////////////////////End rendering stuff




let addTodoItem = (request, response) => {
    let item = request.params.newItem;
    fileReaderAndParse('./todos.json')
    .then((jsonData) => {
        let itemId = jsonData.length === 0 ? 0: jsonData[jsonData.length - 1].ID + 1;//if first item 0 otherwise last item's id + 1
        jsonData.push({
            ID: itemId,
            item,
            DONE: false
        });
        fileWriter('./todos.json', jsonData);
        response
        .json({
            "message": `"${item}" is added to your list`,
            "statusCode": response.statusCode,
            "statusMessage": response.statusMessage
        });
    })
    .then(() => response.end())
    .catch((err) => console.log(err));
};







let clearJsonFile = (request, response) => {
    fileReaderAndParse('./todos.json')
    .then((jsonData) => {
       jsonData.length = 0;
       fileWriter('./todos.json', jsonData);
    })
    .then(() => response.json({
        "message": "Your todo list is cleared",
        "statusCode": response.statusCode,
        "statusMessage": response.statusMessage
    }))
    .then(() => response.end())
    .catch((err) => console.log(err));
};




let markItem = (request, response) => {
    let id = parseInt(request.params.ID);
    fileReaderAndParse('./todos.json')
    .then((jsonData) => {
        let itemIndex = jsonData.findIndex((item) => item.ID === id);//Getting the index of the todo item that has the given id
        if(!jsonData[itemIndex].DONE){
            jsonData[itemIndex].DONE = true;
            fileWriter('./todos.json', jsonData);
            response.json({
                "message": `The DONE flag of the item: "${item[itemIndex].item}" is set to true`,
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            });
        } else {
            response.json({
                "message": `"The DONE flag of the item: ${item[itemIndex].item}" is already set to true`,
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            });
        }
        
    })
    .then(() => response.end())
    .catch((err) => console.log(err));
};



let unmarkItem = (request, response) => {
    let id = parseInt(request.params.ID);
    fileReaderAndParse('./todos.json')
    .then((jsonData) => {
        let itemIndex = jsonData.findIndex((item) => item.ID === id);
        if(jsonData[itemIndex].DONE){
            jsonData[itemIndex].DONE = false;
            fileWriter('./todos.json', jsonData);
            response.json({
                "message": `The DONE flag of the item: "${item[itemIndex].item}" is set to false`,
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            });
        } else {
            response.json({
                "message": `The DONE flag of the item: "${item[itemIndex].item}" is already false`,
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            });
        }
        
    })
    .then(() => response.end())
    .catch((err) => console.log(err));
};


let updateItem = (request, response) => {
    let id = parseInt(request.params.ID);
    let newItem = request.params.updatedItem;
    console.log(id, newItem);
    fileReaderAndParse('./todos.json')
    .then((jsonData) => {
        let itemIndex = jsonData.findIndex((item) => item.ID === id);
        jsonData[itemIndex].item = newItem;
        fileWriter('./todos.json', jsonData);
        response.json({
            "message": `The todo item with the id "${jsonData[itemIndex].ID}" is now set to "${jsonData[itemIndex].item}"`,
            "statusCode": response.statusCode,
            "statusMessage": response.statusMessage
        });
    })
    .then(() => response.end())
    .catch((err) => console.log(err));
};


let deleteItem = (request, response) => {
    let id = parseInt(request.params.ID);
    fileReaderAndParse('./todos.json')
    .then((jsonData) => {
        let itemIndex = jsonData.findIndex((item) => item.ID === id);
        if (itemIndex !== -1){
            response.json({
                "message": `Item "${jsonData[itemIndex].item}" is deleted`,
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            });
            jsonData.splice(itemIndex, 1);
            fileWriter('./todos.json', jsonData);            
        } else {
            response.statusCode = 404;
            response.statusMessage  = "Not Found";
            response.json({
                "err": true,
                "message": `No such id`,
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            });
        }
    })
    .then(() => response.end())
    .catch((err) => console.log(err));
}


let default404Handler = (request, response) => {
    request.statusCode = 404;
    request.statusMessage = "Not found";
    response.json({
        "err": true,
        "message": "wrong usage, try looking at the manual by typing '/' or '/help'",
        "statusMessage": request.statusMessage,        
        "StatusCode": request.statusCode,
    });
};





module.exports = {
    renderManual,
    listTodos,
    addTodoItem,
    clearJsonFile,
    markItem,
    unmarkItem,
    updateItem,
    deleteItem,
    default404Handler
};