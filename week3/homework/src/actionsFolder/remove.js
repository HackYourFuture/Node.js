async function remove(action, request, response) {
  try {
    await action.reset([]);
    response.status(201).send({ succeeded: 'the whole content of JSON file has been deleted' });
  } catch (err) {
    response.status(404).send({ error: err });
  }
}

module.exports = remove;
