const fs = require('fs');

let removeData = function(request, response) {
    if (isNaN(request.params.id )) console.log("Please specify a number ");
    else {
        let index = +(request.params.id ) - 1;
        fs.readFile("./todo.json", "UTF-8", function (err, contents) {
            
                        if (err) console.log(err);
                        todo = JSON.parse(contents);
                        todo.splice(index, 1);
                        fs.writeFileSync('./todo.json', JSON.stringify(todo));

                        response.end();
                    });
    
    }
}

module.exports = removeData;