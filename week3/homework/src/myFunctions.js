const fs = require('fs');
function createToDo(request, response) {
  fs.readFile('./todos.json', 'utf8', (error, contents) => {
    if (error) {
      response.status(500).send('Whats wrong with you');
    } else {
      const updatedContent = JSON.parse(contents);
      updatedContent.push(request.body);
      const updatedNewContent = JSON.stringify(updatedContent);
      fs.writeFile('./todos.json', updatedNewContent, err => {
        if (err) throw err;
      });
      response.send(updatedNewContent);
    }
  });
}

function readToDos(request, response) {
  fs.readFile('./todos.json', 'utf8', (error, file) => {
    if (error) {
      response.status(500).send('There is no toDoList file.');
      return 'An Error Occured';
    } else {
      response.json(JSON.parse(file));
    }
  });
}

function readToDo(request, response) {
  fs.readFile('./todos.json', 'utf8', (error, file) => {
    if (error) {
      response.status(500).send('There is no toDoList file.');
      return 'An Error Occured';
    } else {
      const id = request.params.id;
      response.json(JSON.parse(file)[id - 1]);
    }
  });
}

function deleteToDo(request, response) {
  fs.readFile('./todos.json', 'utf8', (error, contents) => {
    if (error) {
      response.status(500).send('Whats wrong with you');
    } else {
      const updatedContent = JSON.parse(contents);
      updatedContent.splice(request.params.id - 1, 1);
      const updatedNewContent = JSON.stringify(updatedContent);
      fs.writeFile('./todos.json', updatedNewContent, err => {
        if (err) throw err;
        console.log(request.params.id, 'is removed from your toDoList');
      });
      response.send(updatedNewContent);
    }
  });
}

function clearToDos(response) {
  fs.readFile('./todos.json', 'utf8', error => {
    if (error) {
      console.log('File not found');
      response.status(500).send('File not found');
    } else {
      fs.truncate('./todos.json', 0, function() {
        console.log('done');
        response.json();
      });
    }
  });
}

function markAsDoneOrMarkAsNotDone(request, response, trueOrFalse) {
  fs.readFile('./todos.json', 'utf8', (error, contents) => {
    if (error) {
      response.status(500).send('Oops!I cant get it!');
    } else {
      const id = request.params.id;
      let updatedContent = JSON.parse(contents);
      updatedContent[id - 1].done = trueOrFalse;
      fs.writeFile('./todos.json', JSON.stringify(updatedContent), error => {
        if (error) {
          response.status(500).send('Something went wrong!');
        } else {
          response.json(updatedContent);
        }
      });
    }
  });
}

function updateToDo(request, response) {
  fs.readFile('./todos.json', 'utf8', (error, contents) => {
    if (error) {
      response.status(500).send('Whats wrong with you');
    } else {
      const updatedContent = JSON.parse(contents);
      updatedContent[request.params.id - 1].todo = request.body.todo;
      const updatedNewContent = JSON.stringify(updatedContent);
      fs.writeFile('./todos.json', updatedNewContent, err => {
        if (err) throw err;
        console.log(request.params.id, 'is updated to', request.body.todo);
      });
      response.send(updatedNewContent);
    }
  });
}

module.exports = {
  createToDo,
  readToDos,
  readToDo,
  deleteToDo,
  clearToDos,
  markAsDoneOrMarkAsNotDone,
  updateToDo,
};
