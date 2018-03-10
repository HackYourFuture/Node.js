'use strict';

// delete is a JavaScript keyword, using delete_ instead
function delete_(todo, request, response) {
  const id = request.params.id;

  todo.delete_(id)
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch(error => {
      console.error(error);

      response.status(500);
      response.json({ error: 'Internal Server Error' });
    });
};

module.exports = delete_;
