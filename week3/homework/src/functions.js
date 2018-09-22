const fs = require('fs');

function add(data, item) {
  const lastObject = data[data.length - 1];
  let counter = 0;
  if (lastObject === undefined) {
    counter = 0;
  }
  else {
    counter = parseInt(lastObject.id) + 1;
  }
  const newTaskObject = {
    index: counter,
    description: item
  };
  data.push(newTaskObject);

  fs.writeFile('./to-do.json', JSON.stringify(data), (error) => {
    if (error) throw error;
    console.log(data);
  });
}

function update(data, index, type) {
  const todos = JSON.parse(data);
  todos[index - 1].done = type;

  fs.writeFile('./to-do.json', JSON.stringify(todos), (error) => {
    if (error) {
      console.log(error);
    }
  });
}

function showTask(data, index) {
  if (data.length === 0) {
    return { 'error': 'Your list is empty' };
  }
  else if (index > data.length) {
    return { 'error': "This task doesn't exist yet" };
  }
  else {
    return data[index - 1];
  }
}

function reset() {
  fs.writeFile('./to-do.json', '[]', (error) => {
    if (error) {
      console.log(error);
    }
  });
}
function removeTask(data, index) {
  data.splice(index - 1, 1);
  fs.writeFile('./to-do.json', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = {
  add: add,
  update: update,
  showTask: showTask,
  reset: reset,
  removeTask: removeTask
};
