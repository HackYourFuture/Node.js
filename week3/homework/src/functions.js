const fs = require('fs');
const data = require('./index');
const path = './to-dos.json';
const fileName = 'to-dos.json';
const uuidv4 = require('uuid/v4');
const defaultFileContent = { todoArray: [] };

function isFileExist() {
  try {
    if (fs.existsSync(path)) {
      return true;
    } else {
      fs.writeFileSync(fileName, JSON.stringify(defaultFileContent));
      return false;
    }
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function isInputValid(request) {
  try {
    if (request.headers['content-type'] === 'application/json') {
      if (request.body.hasOwnProperty('todo')) {
        if (request.body.todo.hasOwnProperty('description')) {
          if (
            request.body.todo.description !== undefined &&
            request.body.todo.description !== null &&
            request.body.todo.description !== ''
          ) {
            return true;
          }
        }
      }
    } else return false;
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function help() {
  try {
    return JSON.parse(fs.readFileSync('help.json', 'utf8'));
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function list() {
  try {
    if (isFileExist()) {
      return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    }
    return defaultFileContent;
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function create(request) {
  try {
    if (isFileExist()) {
      if (isInputValid(request)) {
        request.body.todo.id = uuidv4();
        request.body.todo.done = false;
        const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        obj.todoArray.push(request.body);
        fs.writeFileSync(fileName, JSON.stringify(obj));
        return obj;
      }
      return { error: 'content-type is not application/json or todo text is not valid' };
    }
    return defaultFileContent;
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function getToDoById(id) {
  try {
    if (isFileExist()) {
      const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
      const result = obj.todoArray.filter(element => {
        if (element.todo.id == id) {
          return element;
        }
      });
      if (result.length == 0) {
        return { error: 'There is no id=' + id + ' in todo list' };
      } else {
        return result[0];
      }
    }
    return defaultFileContent;
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function markToDo(id, method) {
  try {
    if (isFileExist()) {
      const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
      const result = obj.todoArray.filter(element => {
        if (element.todo.id == id) {
          if (method === 'POST') {
            element.todo.done = true;
          }
          if (method === 'DELETE') {
            element.todo.done = false;
          }
          return element;
        }
      });
      if (result.length == 0) {
        return { error: 'There is no id=' + id + ' in todo list' };
      } else {
        fs.writeFileSync(fileName, JSON.stringify(obj));
        return result[0];
      }
    }
    return defaultFileContent;
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function update(request, id) {
  try {
    if (isFileExist()) {
      if (isInputValid(request)) {
        const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        const result = obj.todoArray.filter(element => {
          if (element.todo.id == id) {
            element.todo.description = request.body.todo.description;
            element.todo.done = request.body.todo.done;
            return element;
          }
        });
        if (result.length == 0) {
          return { error: 'There is no id=' + id + ' in todo list' };
        } else {
          fs.writeFileSync(fileName, JSON.stringify(obj));
          return obj;
        }
      }
      return { error: 'content-type is not application/json or todo text is not valid' };
    }
    return defaultFileContent;
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function deleteToDoById(id) {
  try {
    if (isFileExist()) {
      const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
      let indexToRemove;
      for (let i = 0; i < obj.todoArray.length; i++) {
        if (obj.todoArray[i].todo.id == id) {
          indexToRemove = i;
        }
      }
      if (indexToRemove === undefined) {
        return { error: 'There is no id=' + id + ' in todo list' };
      }
      obj.todoArray.splice(indexToRemove, 1);
      fs.writeFileSync(fileName, JSON.stringify(obj));
      return obj;
    }
    return defaultFileContent;
  } catch (error) {
    return { error: `${error.message}` };
  }
}

function clearList() {
  try {
    fs.writeFileSync(fileName, JSON.stringify(defaultFileContent));
    return defaultFileContent;
  } catch (error) {
    return { error: `${error.message}` };
  }
}

module.exports = {
  help,
  list,
  create,
  getToDoById,
  markToDo,
  update,
  deleteToDoById,
  clearList,
};
