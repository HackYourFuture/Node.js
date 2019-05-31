async function readToDo(action, request, response) {
  try {
    let todoList = await action.list();
    todoList = JSON.parse(todoList);
    const index = parseInt(request.params.id);
    if (index > 0 && index <= todoList.length) {
      response.status(200).send(todoList[index - 1]);
    } else {
      response.status(404).send({ error: 'invalid id number' });
    }
  } catch {
    response.status(404).send({ error: 'there is an error' });
  }
}

module.exports = readToDo;
