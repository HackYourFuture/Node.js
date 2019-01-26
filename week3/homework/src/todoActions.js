
const fs = require('fs')

function fsRead() {
  return new Promise(resolve => {
      fs.readFile('./to-do.json', 'utf8', (err, data) => {
          if (err) {
             console.log(err);
          } else {
              resolve(data);
          }
      });
  })
}

function fsWrite (file) {
  fs.writeFile('./to-do.json', JSON.stringify(file), function (error) {
    if (error) {
    console.log(error)
    }
})
}

async function add(task) {
  const allToDoStr = await fsRead();
  let allToDo = JSON.parse(allToDoStr);
  const newToDo = {
    "todo": {
      "description": task,
      "done": false
    }
  }

  allToDo.push(newToDo)
  fsWrite(allToDo);
}

async function show(res) {
  const allToDoStr = await fsRead();
  let allToDo = JSON.parse(allToDoStr);
  console.log(allToDo);
   res.json(allToDo);
}

async function update(task, id) {
  const allToDoStr = await fsRead();
  let allToDo = JSON.parse(allToDoStr);
  const newToDo = {
    "todo": {
      "description": task,
      "done": allToDo[id]["todo"]["done"]
    }
  }
  allToDo[id]=newToDo
  fsWrite(allToDo);
}

async function remove(id) {
  const allToDoStr = await fsRead();
  let allToDo = JSON.parse(allToDoStr);

  allToDo.splice(id,1)
  fsWrite(allToDo);
}

async function mark(done,id) {
  const allToDoStr = await fsRead();
  let allToDo = JSON.parse(allToDoStr);
  const newToDo = {
    "todo": {
      "description": allToDo[id]["todo"]["description"],
      "done": done
    }
  }
  allToDo[id]=newToDo
  fsWrite(allToDo);
}

async function showSingleId(id,res) {
  const allToDoStr = await fsRead();
  let allToDo = JSON.parse(allToDoStr);
  res.json(allToDo[id]);
}

async function removeAll() {
  const emptyArray = []
  fsWrite(emptyArray);
}


module.exports = {
  add,
  show,
  update,
  remove,
  mark,
  showSingleId,
  removeAll
}
