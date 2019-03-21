const log = () => {
  const text = `Something went wrong or you asked for help. Here some commands that you can use.
    
  Usage:  node -script file- -command- -file- -task-

  Options: 
  list: node {sf} list
  add: node {sf} add {file} {task}
  update: node {sf} update {file} {task} {newTask}
  remove: node {sf} remove {file} {task}
  reset: clears all tasks

  Hint: 
    If your task is more than one word use double-quotes ("")
 `;
  console.log(text);
};

module.exports = { log };
