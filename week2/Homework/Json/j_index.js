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
		readFile('j_help.txt')
		.then((result) => console.log(result))
		.catch((error) => console.log(error));
		break;
	case "list":
		readFile('j_items.txt')
		.then((result) => console.log(result))
		.catch((error) => console.log(error));
		break;
	case "add":
		if (process.argv.length >= 5){
			let key = process.argv[3];
			let value = process.argv[4];
			readFile('j_items.txt')
			.then((result) => {
				let obj = JSON.parse(result);
				if(obj.hasOwnProperty(key))
					return "This key is already exist!";
				else
				{
					obj[key] = value;
					return writeFile('j_items.txt' ,  JSON.stringify(obj))
				}
			})
			.then((result) => console.log(result)) 
			.catch((error) => console.log(error));
		}
		break;
	case "remove":
		if (process.argv.length >= 4){
				let key = process.argv[3];
				readFile('j_items.txt')
				.then((result) => {
					let obj = JSON.parse(result);
					if(!obj.hasOwnProperty(key))
						return "This key is not exist!";
					else{
						delete obj[key]; 
						return writeFile('j_items.txt' ,  JSON.stringify(obj)) 
					}
					})
				.then((result) => console.log(result)) 
				.catch((error) => console.log(error));
		}
		break;
	case "reset":
		writeFile('j_items.txt' ,  "{}")
		.then((result) => console.log(result)) 
		.catch((error) => console.log(error));
		break;
	case "update":
		if (process.argv.length >= 5){
			let key = process.argv[3];
			let value = process.argv[4];
			readFile('j_items.txt')
			.then((result) => {
				let obj = JSON.parse(result);
				if(!obj.hasOwnProperty(key))
					return "This key is not exist!";
				else
				{
					obj[key] = value;
					return writeFile('j_items.txt' ,  JSON.stringify(obj))
				}
			})
			.then((result) => console.log(result)) 
			.catch((error) => console.log(error));	
		}
		break;	
}



