const fs = require('fs');

let addData = function(request, response) {
    fs.readFile("./todo.json", "UTF-8", function (err, contents) {
        
                if (err) console.log(err);

                todo = JSON.parse(contents)
                let addContent = { item : request.query.add }; 

                todo.push(addContent);
                fs.writeFileSync('./todo.json', JSON.stringify(todo));

                response.end();

            });        
    
    
}

module.exports = addData;