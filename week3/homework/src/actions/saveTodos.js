const fs = require('fs');


function saveTodos(todos) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./todos.json', JSON.stringify(todos), 'utf8', err => {
           if(err)  {
            reject(err);
           } else{
               resolve();
           }
        });
    });
}

module.exports = saveTodos;