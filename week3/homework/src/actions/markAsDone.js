async function markAsDone(todo, req, res) {
  try {
    const todoList = await todo.readList().then(todoList => JSON.parse(todoList));
    const index = parseInt(req.params.id);
    if (index > 0 && index <= todoList.length) {
      if (todoList[index - 1].done === false) {
        todoList[index - 1].done = true;
        await todo._save(todoList);
        res.status(404).send({ Success: 'Todo has been marked as DONE' });
      } else if (todoList[index - 1].done === true) {
        todoList[index - 1].done = false;
        await todo._save(todoList);
        res.status(201).send({ Success: 'Todo has been marked as UN-DONE' });
      }
    } else {
      res.status(400).send({ Failed: 'Please insert a valid id' });
    }
  } catch (error) {
    res.status(404).send({ error: '404 Not Found :(' });
  }
}

module.exports = markAsDone;
