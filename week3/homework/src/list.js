async function middleWare(action, request, response) {
  try {
    let todoList = await action.list();
    // get a specific element
    todoList = JSON.parse(todoList);
    let index = parseInt(request.params.id);
    if (index > 0 && index <= todoList.length) {
      response.status(200).send(todoList[index - 1]);
    } else {
      response.status(404).send({ error: 'invalid id number' });
    }
  } catch {
    response.status(404).send({ error: 'there is an error' });
  }
}

module.exports = middleWare;
