/* jshint esnext: true */


const fs = require('fs');
const readline = require('readline');

fs.exists('./todos.json', (exists) => {
    if(!exists){
        fs.writeFile('todos.json', '[]', (err) => {
            if (err) throw err;
            launch();
        });
    } else {
        launch();
    }
});

function launch(){
    if(process.argv[2] !== undefined){
        start();
    } else {
        console.log('Please specify an option to use, here is the manual\n');
        manualReader();
    }
}


function start() {
    switch(process.argv[2].trim().toLowerCase()){
        case 'help':
            manualReader();
            break;
        case 'add':
                checkFileExistance().then((item) => addTodoItem(item, process.argv[3])).catch((err) => console.log(err));
            break;
        case 'reset':
            itemsResetter();
            break;
        case 'list':
            listTodoItems();
            break;
        case 'mark':
            setMark(process.argv[3], process.argv[4]);
            break;
        case 'delmark':
            removeMark(process.argv[3]);
            break;
        case 'update':
            updateItem(process.argv[3]);
            break;
        case 'remove':
            removeItem(process.argv[3]);
            break;
        default:
            console.log('No such option! Try looking at the manual by typing "node index.js help"');
            break;    
    }
}



function manualReader(){
    fs.readFile('./help.txt', 'UTF-8', (err, data) => {
        if(err) throw err;
        console.log(data);
    });
}

function checkFileExistance(){
    return new Promise((resolve, reject) => {
        fs.readFile('./todos.json', 'UTF-8', (err, data) => {
            if (err) reject(err);
            data = JSON.parse(data);
            resolve(data);
            return;
        });
    });

}

function addTodoItem(data, item){
    if (item !== undefined){
        data.push({'id': item, "status": ''});
        fileWriter(data, './todos.json');
    } else {
        console.log('Specify what you want to add! Check "node index.js help" for more information');
    }  
}

function itemsResetter(){
    fs.readFile('./todos.json', 'UTF-8', (err, data) => {
        if (data !== '[]'){
            data = JSON.parse(data);
            data.length = 0;
            fileWriter(data, './todos.json');
            return;
        }
        console.log('already empty!');
    });
    
}

function listTodoItems(){
    fs.readFile('./todos.json', 'UTF-8', (err, data) => {
        data = JSON.parse(data);
        if(data !== '[]'){
            let text = data.reduce(((prev, curr, index) => prev +=`${index + 1}. ${curr.id}\t\t\t${curr.status}\n`), ``);
            console.log(text);
            return;
        }
        console.log('Todo list is empty!');
    });
}

function setMark(index, state){
    index = parseInt(index) - 1;
    fs.readFile('./todos.json', 'UTF-8', (err, data) => {
        data = JSON.parse(data);
        if(data[index] !== undefined && state !== undefined){
            data[index].status = state.toUpperCase();
            fileWriter(data, './todos.json');
        } else if(data[index] === undefined) {
            console.log('No corresponding item!');            
        } else {
            console.log('Choose the status the you want, check "node index.js help" to see how to use it');            
        }
    }); 
}

function removeMark(index){
    index = parseInt(index) - 1;
    fs.readFile('./todos.json', 'UTF-8', (err, data) => {
        data = JSON.parse(data);
        if(data[index] !== undefined && data[index].status !== '' ){
            data[index].status = '';
            fileWriter(data, './todos.json');
        } else if(data[index] === undefined) {
            console.log('No correspoding item!');            
        } else{
            console.log('There\'s no mark! Try "node index.js list" to see the items');            
        }
    });    
}

function updateItem(index){
    index = parseInt(index) - 1;
    fs.readFile('./todos.json', 'UTF-8', (err, data) => {
        data = JSON.parse(data);
        if(data[index] !== undefined){
            let rl = readline.createInterface(process.stdin, process.stdout);
            rl.question(`The to be modified item is "${data[index].id}", what should it become?`, (answer) => {
                data[index].id = answer;
                fileWriter(data, './todos.json');
                rl.close();
            });
        } else{
            console.log('No corresponding item! Try "node index.js list" to see the items');
        }
    });
}

function removeItem(index){
    index = parseInt(index) - 1;
    fs.readFile('./todos.json', 'UTF-8', (err, data) => {
        data = JSON.parse(data);
        if(data[index] !== undefined){
            data.splice(index, 1);
            fileWriter(data, './todos.json');
        } else {
            console.log('No correspnding item! Try "node index.js list" to see the items');
        }
    });
}

