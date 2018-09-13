'use strict';

// TODO: Write the homework code in this file
let fs = require('fs');
let command = process.argv[2];
let item = process.argv[3];
switch(command){
    case 'add' :
        add(item);
        break
    case 'remove':
        remove(item);
        break;
    case 'list':
        list(item);
        break;
    case 'reset':
        reset(item);
        break;
    case 'help' :
        console.log( `Usage:
        - Each command is supposed to be preceded by "node . "
        - you have the following commands
           -- add        Adds a to-do item into .data.txt. Each item is entered inside " ".
           -- remove     Removes a to-do item according to its index number.
           -- reset      Removes all to-do items from the list.
           -- list       Shows current to-dos, or shows an appropriate text if there are no to-dos
           -- help       Show  information of cli commands`);
           break;
};
function add (item){
    fs.appendFile('./data.txt', item + '\n', (error)=>{
        if (error){
            console.log(error);
        };
    });
};
function remove (item){
    let arrayRemove= fs.readFileSync('./data.txt').toString().split('\n');
    arrayRemove.splice(item,1);
    fs.writeFile('./data.txt',arrayRemove.join('\n'),(error)=>{
        if(error){
            console.log(error);
        };
    });
};
function list (){
    let arrayList=fs.readFileSync('./data.txt','utf8');        
    if(arrayList.length == 0){
        console.log(`There is nothing in the to-do list`);
    }else{
        console.log(arrayList)
    };
};
function reset(){
    fs.truncate('./data.txt',0,(err,data)=>{       
         if (err){
        console.log(err)
        };
    });
};
