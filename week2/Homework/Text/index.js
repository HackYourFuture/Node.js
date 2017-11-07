//console.log("Hello World!" , process.argv);
fs = require('fs');
let command = "";

if (process.argv.length < 3)
	command = "help" ;
else
	command = process.argv[2];

function readFile(file_name){return new Promise(
    (resolve, reject) => {
		fs.readFile(file_name, 'utf8', function (err,data) {
			  if (err) {
				reject(err);
			  }
			  else{
				  resolve(data);
			  }
		});
    });
}
function writeFile(file_name , file_data){return new Promise(
    (resolve, reject) => {
		fs.writeFile(file_name, file_data, function (err) {
			  if (err) {
				reject(err);
			  }
			  else{
				resolve(file_data);
			  }
		});
    });
}

switch(command){
	case "help" :
		readFile('help.txt')
		.then((result) => console.log(result))
		.catch((error) => console.log(error));
		break;
	case "list":
		readFile('items.txt')
		.then((result) => console.log(result))
		.catch((error) => console.log(error));
		break;
	case "add":
		if (process.argv.length >= 4){
			let new_item = process.argv[3];
			readFile('items.txt')
			.then((result) => {return writeFile('items.txt' ,  result + new_item + "\n")})
			.then((result) => console.log(result)) 
			.catch((error) => console.log(error));
		}
		break;
	case "remove":
		if (process.argv.length >= 4){
				let remove_index = process.argv[3] - 1;
				readFile('items.txt')
				.then((result) => {
					let todo_arr = result.split("\n");
					if(remove_index < todo_arr.length && remove_index >= 0){
						  todo_arr.splice(remove_index, 1);
						  return writeFile('items.txt' ,  todo_arr.join("\n")) 
					 }
					 else{
						 return 'Index is wrong!';
					 }
					})
				.then((result) => console.log(result)) 
				.catch((error) => console.log(error));
		}
		break;
	case "reset":
		writeFile('items.txt' ,  "")
		.then((result) => console.log(result)) 
		.catch((error) => console.log(error));
		break;
	case "update":
		if (process.argv.length >= 5){
			let replace_index = process.argv[3] - 1;
			let replace_item = process.argv[4];
			readFile('items.txt')
			.then((result) => {
			let todo_arr = result.split("\n");
			if(replace_index < todo_arr.length && replace_index >= 0){
				  todo_arr[replace_index] = replace_item;
				  return writeFile('items.txt' ,  todo_arr.join("\n")) 
			 }
			 else{
				 return 'Index is wrong!';
			 }
			})
			.then((result) => console.log(result)) 
			.catch((error) => console.log(error));	
		}
		break;	
}



