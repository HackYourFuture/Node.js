const log = () => {
  const text =`Something went wrong or you asked for help. Here some commands that you can use.
    
  Usage:  node -command- -file- -task-

  Options:
  list: to list all your task,
  add: to add a new task to your list,
  remove: to remove a specific task,
  reset: clears all tasks
 `
 console.log(text);
}

module.exports={log}