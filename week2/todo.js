
var fs =require('fs');
function respons(parameter) {
//var index= process.argv.indexOf(flag);

  switch(parameter){

    case undefined :console.log('Print help File');

    case 'help'  :  showHelpFile();
          break
    case 'list'  :  showTodoFile();

                console.log(' ---List of To Do File---.\n ');
          break;
    case 'add'   :
                  var todo=process.argv.slice(3).join(' ');
                  add(todo);
                  console.log(`The job ( ${todo} )hase been added to todo file`);
          break;
    case 'remove': removeTodoItem();

          break;
    case 'reset' :
                    eraseTodoFile();
                  console.log ('The contaies Content of todo file has been erased');
          break;
    case 'update': var updateTodoItem=process.argv.slice(4).join(' ');
                   updateTodo(updateTodoItem);
              console.log('Update the todo file');
          break;

    default: console.log(' Unknown parameter .');
              showHelpFile();
    break


  }


}
var parameter = process.argv[2];

respons(parameter);
// This function shows the Help File;
function showHelpFile(){
  fs.readFile('./help.txt', 'utf8', function(error, help){
    if(error){
      console.log(error);
    } else {
      process.stdout.write(help);
    }
  })
}
//This fucnction add new to to to todo.txt file;
function add(newToDo) {
  fs.appendFile('./todo.txt', newToDo+'\n', function(error ){
    if (error) console.log(error);
  })
}
// This unction erase the containts of todo file;
function eraseTodoFile(){
    fs.writeFile('./todo.txt','',function(error){
    if (error) console.log(error);
  })
}
// LIst to do file.
function showTodoFile(){
  fs.readFile('./todo.txt', 'utf8', function(error, todo){
    if(error){
      console.log(error);
    } else {
        var todoArray=todo.split('\n');
          for (var i=0; i<todoArray.length-1;i++){
            console.log (`${i+1} - ${todoArray[i]}`)
          }

    }
  })
}
// Remove Item From Todo File;
function removeTodoItem(){
  fs.readFile('./todo.txt', 'utf8', function(error, todo){
        if(error){
      console.log(error);
    } else {
            var todoArray=todo.split('\n');
            if (process.argv[3]<0 || process.argv[3]  >todoArray.length-1 || process.argv[3]===undefined){
                console.log("Index is not correct or not found.")
                return 0;
            }
            var postion=process.argv[3]-1;
            var removedTodo=todoArray.splice(postion,1);
            eraseTodoFile()
            for (var i=0 ; i<todoArray.length-1;i++){
            var newEntry=todoArray[i];
                  fs.appendFile('./todo.txt',newEntry+'\n',function(error){
                  if (error) console.log(error);
              })
          }
    }
    console.log(`The entry (${postion+1} - ${removedTodo} ) has been removed from Todo List.`);
  })

}

// Remove Item From Todo File;
function updateTodo(updateTodoItem){
  fs.readFile('./todo.txt', 'utf8', function(error, todo){
        if(error){
      console.log(error);
    } else {
            var todoArray=todo.split('\n');
            if (process.argv[3]<0 || process.argv[3]  >todoArray.length-1 || process.argv[3]===undefined){
                console.log("Index is not correct or not found.")
                return 0;
            }
            var newTodoArray=[];
            var postion=process.argv[3]-1;
            var updateTodo=todoArray.splice(postion,1);
            console.log(todoArray);
            for (var i=0; i<todoArray.length;i++){
                if (i===(process.argv[3]-1)){
                  newTodoArray.push(updateTodoItem);
                  newTodoArray.push(todoArray[i]);
                }else {newTodoArray.push(todoArray[i]);}

            }

              eraseTodoFile();
              for (var j=0 ; j<newTodoArray.length;j++){
                    var newEntry=newTodoArray[j];
                    fs.appendFile('./todo.txt',newEntry+ '\n',function(error){
                    if (error) console.log(error);
                })
            }

    }

    console.log(`The entry (${postion+1} - ${updateTodo} ) has been updated.`);
  })

}
