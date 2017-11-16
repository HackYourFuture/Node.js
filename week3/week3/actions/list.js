const fs = require('fs');

let listData = function(request, response) {
    fs.readFile("./todo.json", "UTF-8", function (err, contents) {
        
                if (err) console.log(err);
                todo = JSON.parse(contents)
                for (i of todo) response.write(` -  ${i.item } \n` );

                response.end();
            });
    
    
}

module.exports = listData;