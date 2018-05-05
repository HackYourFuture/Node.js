const fs = require('fs');
const fileName = './to-dos.json';

function add(todo){

    var json = read();
    json.push(todo);

    save(json);
}

function read(){

    if(fs.existsSync(fileName)){
        return require(fileName);
    } else {
        return [];
    }
}

function remove(index){
    
    var json = read();

    if(index >= 0 && index < json.length){

        json.splice(index, 1);

        save(json);
    }
}

function reset(){
    fs.unlinkSync(fileName);
}

function save(json){

    fs.writeFile(fileName, JSON.stringify(json), function (err) {
        if (err) 
            return console.log(err);
    });
}

function update(index, value){
    
    var json = read();

    if(index >= 0 && index < json.length){
        
        json[index] = value;
    
        save(json);
    }
}

module.exports = {
    add : add,
    read : read,
    remove : remove,
    reset : reset,
    update : update
}