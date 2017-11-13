const fs = require('fs');
const readline = require('readline');
let todos = [];//to be filled todo list

//check if there is a parameter
if(process.argv[2] !== undefined){
    start();
} else {
    console.log('Please specify an option to use, here is the manual\n');
    manualReader('./help.txt');
}


function start(){
    switch(process.argv[2].trim().toLowerCase()){
        case 'help':
            manualReader('./help.txt');
            break;
        case 'add':
            checkFileContent().then((item) => addTodoItem(item)).catch((err) => console.log(err));
            break;
        case 'list':
            console.log('The items on your todo list: ');
            todoFileReader('./todos.txt');
            break;
        case 'remove':
            itemRemover(process.argv[3]);
            break;
        case 'reset':
            itemsResetter();
            break;
        case 'cross':
            crossItem(process.argv[3]);
            break;
        case 'uncross':
            uncrossItem(process.argv[3]);
            break;
        case 'update':
            update(process.argv[3]);
            break;
        default:
            console.log('No such option! Take a look at the manual\n');
            manualReader('./help.txt');
            break;
    }
} 



//  display the manual
function manualReader(fileName){
    fs.readFile(fileName, 'UTF-8', (err, data) => {
        console.log(data);
    });
}

//  display the todo file once called
function todoFileReader(fileName){
    fs.exists(fileName, (exists) => {
        //see if file exists to add the existing items to the array
        if(exists){
            fs.readFile(fileName, 'UTF-8', (err, data) => {
                if (data === ""){
                    console.log('There are no items yet, try using \'node index.js add "some todo item"\'');
                    return;
                } 
                data = data.split('\r\n');
                let text = data.reduce(((last, item, index) => last += `${index + 1}. ${item}\n`), ``);
                console.log(text);
            });
        } else {
            console.log('There are no items yet, try using \'node index.js add "some todo item"\'');
        }
    });
}



//check if there's already a file and push its contents into the todos array
function checkFileContent(){
    return new Promise(function(resolve, reject){
        fs.exists('./todos.txt', (exists)=>{
            if(!exists){
                resolve(process.argv[3]);
                return;                
            }
            fs.readFile('todos.txt', 'UTF-8', (err, data) => {
                todos = data.trim().split('\r\n');
                resolve(process.argv[3]);
            });
        });
    });
}

//add the new item to the array
function addTodoItem(todoItem){
    if(todoItem !== ''){
        if(todoItem.trim() !== ''){
            todos.push(todoItem.trim());
            todosWriter(todos);
        }
    } else {
        console.log('Not the correct usage! Try "node index.js help"');        
    }
}

// re-write existing file with new todos array 
function todosWriter(itemsArr){
    itemsArr.filter((a) => a !== '');
    fs.writeFile('./todos.txt', itemsArr.join('\r\n'), 'UTF-8', (err) => {
        if(err) console.log(err);
    });
}

//remove item based on filled index
function itemRemover(index){
    //if index was actually filled in
    if(index !== undefined){
        index = parseInt(index) - 1;
        fs.readFile('./todos.txt', 'UTF-8', (err, data) => {
            data = data.split('\r\n');
            //if that index actually existed in the todo list
            if(data[index] !== undefined){
                data.splice(index, 1);
                todosWriter(data);
                return;
            }
            console.log('You don\'t have that much items on your list!');
        });
    } else {
        console.log('Not the correct usage! Try "node index.js help"');
    }
}

//  empty the todos file
function itemsResetter(){
    fs.writeFile('./todos.txt', '', (err) => {
        if (err) console.log(err);
    });
    console.log('Resetted the todo list');
}


//  modify an item based on filled index
function update(index){
    //check if an index was actually filled in
    if(index !== undefined){
        index = parseInt(index) - 1;
        fs.readFile('./todos.txt', 'UTF-8', (err, data) => {
            data = data.split('\r\n');
            if(data[index] !== undefined){
                let rl = readline.createInterface(process.stdin, process.stdout);       
                rl.question(`the item to be modified is"${data[index]}", what will it be? `, (answer) => {
                    data[index] = answer;
                    todosWriter(data);
                    rl.close();
                    return;
                });
            } else {
                console.log('That item doesn\'t exist yet!');            
            }
        });
    } else {
        console.log('Not the correct usage! Try "node index.js help"');                
    }
    
}


//  mark item as DONE
function crossItem(index){
    //  Check if an index was actually filled in
    if(index !== undefined){
        fs.readFile('./todos.txt', 'UTF-8', (err, data) => {
            data = data.split('\r\n');
            index = parseInt(index) - 1;  
            //check if there's a corresponding todo item for the index and if the item doesn't have the word 'DONE' in it          
            if(data[index] !== undefined && data[index].indexOf('DONE') === -1){
                let item = data[index];
                data[index] += '\t\t\tDONE';//append the word 'DONE'
                console.log('crossed!');
                todosWriter(data);
                return;
            } 
            //if the todo item already has the word 'DONE' in it
            if(data[index].indexOf('DONE') !== -1){
                console.log('It\'s already crossed!');
            } else {
                console.log('You don\'t have that much items on your todo list!\nTry "node index.js --help"');        
            }
        })
    } else {
        console.log('Not the correct usage! Try "node index.js help"');        
    }
}

// remove the mark 'DONE' from a todo item if existed
function uncrossItem(index){
    //checking if an index was filled in
    if(index !== undefined){
        index = parseInt(index) - 1;
        fs.readFile('./todos.txt', 'UTF-8', (err, data) => {
            data = data.split('\r\n');
            //Checking if the index has a corresponding todo item
            if (data[index].indexOf('DONE') !== -1){
                data[index] = (data[index].replace('DONE', '')).trim();
                console.log('It\'s now uncrossed');
                todosWriter(data);
                return;
            } else {
                console.log('It\'s not even crossed!');        
            }
        });
    } else {
        console.log('Not the correct usage! Try "node index.js help"');        
    }
    
}