const fs = require('fs');

function add(data, item) {
    const to_do = JSON.parse(data);
    const lastObject =to_do[to_do.length - 1];
        let counter = 0;
        if (lastObject === undefined) {
            counter;
        } else {
            counter = parseInt(lastObject.id) + 1;
        }
   const newTaskObject = {
       index: counter,
       description: item
   };
   to_do.push(newTaskObject);

   fs.writeFile('./to-do.json', JSON.stringify(to_do), (error) => {
            if (err) throw err;
            console.log(data);
   });

}

function update(data, index, type) {
    const to_do = JSON.parse(data);
    to_do[index - 1].done = type;

    fs.writeFile('./to-do.json', JSON.stringify(toDoList), (error) => {
        if (error) { 
            console.log(error); 
        }
    });

}

function showTask(data, index) {
    const to_do = JSON.parse(data);

    if (to_do.length === 0) {
        return { "error": "Your list is empty" };
    } else if (index > to_do.length) {
        return { "error": "This task doesn't exist yet" };
    } else {
        return to_do[index - 1];
    }
}

function reset() {
    fs.writeFile('./to-do.json', '[]', (error) => {
        if (error) { 
            console.log(error); 
        }
    });;
}
function removeTask(data, index) {
    const to_do = JSON.parse(data);
    to_do.splice(index-1, 1)
    fs.writeFile('./to-do.json', JSON.stringify(to_do)), (error) => {
        if (error) {
            console.log(error);
        }
    }
}


module.exports = {
    add: add,
    update: update,
    showTask: showTask,
    reset: reset,
    removeTask: removeTask
}