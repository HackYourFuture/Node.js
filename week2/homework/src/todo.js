const fs = require('fs');

const loadJSON = () => {
  try {
    const dataBuffer = fs.readFileSync('todos.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveJSON = todos => {
  const dataJSON = JSON.stringify(todos);
  fs.writeFileSync('todos.json', dataJSON);
};

const createOrderValue = array => {
  array.forEach((elem, index) => {
    return (elem.order = index + 1);
  });
};

const addToDo = (title, order) => {
  const todo = loadJSON();

  todo.push({ title, order });
  createOrderValue(todo);
  console.log('New to-do added');

  saveJSON(todo);
};

const removeToDo = order => {
  const todo = loadJSON();

  const keepToDo = todo.filter(elem => elem.order !== order);
  createOrderValue(keepToDo);

  if (todo.length > keepToDo.length) {
    console.log('Selected to-do is  removed');
  } else {
    console.log('No to-do found!');
  }

  saveJSON(keepToDo);
};

const listToDo = () => {
  const todo = loadJSON();

  if (todo.length === 0) {
    console.log('Your list is empty now.');
  } else {
    console.log('Your To-Do`s');
    createOrderValue(todo);
    todo.forEach(elem => {
      return console.log(`${elem.order}.${elem.title}`);
    });
  }
};

const resetToDos = () => {
  const todo = loadJSON();

  if (todo.length === 0) {
    console.log('There is no to-do in your list.');
  } else {
    console.log('All to-do`s deleted.');
    todo.splice(0);
  }

  saveJSON(todo);
};

module.exports = { addToDo, listToDo, removeToDo, resetToDos };
