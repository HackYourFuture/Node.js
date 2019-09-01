const fs = require('fs');

const help = () => {
  try {
    console.log('Command - descriptions');
    console.log('---------------------');
    console.log(
      '1. list - Shows current to-dos, or shows an appropriate text if there are no to-dos'
    );
    console.log('---------------------');
    console.log(
      '2. add - Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.'
    );
    console.log('---------------------');
    console.log('3. remove - Removes a to-do item by its 1-base index, e.g. to remove second item');
    console.log('---------------------');
    console.log('4. reset - Removes all to-do items from the list');
    console.log('---------------------');
    console.log('5. update - Updates a to-do item with new text');
  }
 catch (error) {
    return console.log(error.message);
  }
};

const fetchData = () => {
  try {
    const dataString = fs.readFileSync('todoData.json');
    return JSON.parse(dataString);
  }
 catch (error) {
    return [];
  }
};

let todoArray = fetchData();
const addTodo = title => {
  try {
    const todo = { title: title };
    const isDuplicate = todoArray.filter(todo => todo.title === title);
    if (isDuplicate.length === 0) {
      todoArray.push(todo);
      saveData(todoArray);
      console.log('Todo item added');
      console.log('---------------');
      return todo;
    }
 else {
      console.log('Todo already exists');
    }
  }
 catch (error) {
    return console.log(error.message);
  }
};

const deleteTodo = index => {
  try {
    if (index > 0) {
      const isFiltered = todoArray.filter(todo => todo.title !== todoArray[index].title);
      saveData(isFiltered);
      console.log('Deleted successfully!');
      return todoArray.length !== isFiltered.length;
    }
 else {
      console.log('Please enter available index!');
    }
  }
 catch (error) {
    return console.log(error.message);
  }
};

const updateTodo = (index, todo) => {
  try {
    if (index >= 0) {
      todoArray[index].title = todo;
      saveData(todoArray);
      console.log('Updated!');
    }
 else {
      console.log('Please enter available index');
    }
  }
 catch (error) {
    return console.log(error.message);
  }
};

const saveData = data => {
  try {
    fs.writeFileSync('todoData.json', JSON.stringify(data));
  }
 catch (error) {
    return console.log(error.message);
  }
};

const resetTodo = () => {
  try {
    todoArray.length = 0;
    console.log('Todo list empty');
    saveData(todoArray);
  }
 catch (error) {
    return console.log(error.message);
  }
};

const listTodo = () => {
  try {
    if (todoArray.length > 0) {
      console.log(`Found ${todoArray.length} todo(s).`);
      console.log('Todo item(s) are listed below with index(es)');
      todoArray.forEach((element, index) => {
        console.log('------');
        console.log(`${index} ${element.title}`);
      });
      return fetchData();
    }
 else {
      console.log('There is no item.');
    }
  }
 catch (error) {
    return console.log(error.message);
  }
};

module.exports = {
  help,
  addTodo,
  deleteTodo,
  updateTodo,
  resetTodo,
  listTodo
};
