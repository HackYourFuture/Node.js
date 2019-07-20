'use strict';
function update(todos, todo, id, response) {
  return new Promise((resolve, reject) => {
    let text;
    ({ text } = todo);
    const idMatch = todos.filter(item => {
      return item.id === id;
    });
    if (idMatch.length === 0) {
      reject(response.send('No such ID'));
    } else {
      idMatch[0].todoText = text;
      response.status(200).send('updated');
      resolve(todos);
    }
  });
}
module.exports = update;
