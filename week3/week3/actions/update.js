const fs = require('fs');

let updateData = function(request, response) {
    if (isNaN(request.params.id )) console.log("Please specify a number ");
    else {
        let index = +(request.params.id ) - 1;
        let replaceItem = request.query.id;
        fs.readFile("./todo.json", "UTF-8", function (err, contents) {
            
                        if (err) console.log(err);
                        todo = JSON.parse(contents);
                        todo[index] = { item: replaceItem.toString() };
                        fs.writeFileSync('./todo.json', JSON.stringify(todo));

                        response.end();
                    });
    
    }
}

module.exports = updateData;