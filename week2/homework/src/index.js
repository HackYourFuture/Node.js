'use strict';

// TODO: Write the homework code in this file
'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const command = process.argv[2];
const index = process.argv[3];

switch(command){
    case 'add' :
        add(index);
        break
    case 'remove':
        remove(index);
        break;
    case 'list':
        list();
        break;
    case 'reset':
        reset();
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
function add (index){
    if(fs.existsSync('./data.txt')){
        fs.appendFile('./data.txt', index + '\n', (error)=>{
             if (error){
                console.log(error);
                };
            });
        
    }else{
        fs.writeFileSync('./data.txt','**TODO List**'+'\n'+index+'\n',{flag:'wx'},function(err){
            console.log(err)
        })
    };
};
function remove (index){
    let arrayRemove= fs.readFileSync('./data.txt').toString().split('\n');
    arrayRemove.splice(index,1);
    fs.writeFile('./data.txt',arrayRemove.join('\n'),(error)=>{
        if(error){
            console.log(error);
        };
    });
};
function list (){      
    if(fs.existsSync('./data.txt')){
        let arrayList=fs.readFileSync('./data.txt','utf8'); 
        console.log(arrayList);
    }else{
        console.log(`There is nothing in the to-do list`)
    };
};
function reset(){
    fs.unlinkSync('./data.txt')
};