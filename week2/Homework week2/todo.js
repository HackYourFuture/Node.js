const readline = require("readline");
const fs = require('fs');
if (process.argv[2] === 'help'){
	fs.readFile("./help.md", 'utf-8', (err , data)=>{
		if(err) console.log("error")
		console.log(data)
	})
}

if (process.argv[2] === 'add'){
	fs.readFile("./list.txt", 'utf-8', (err , data)=>{
		let todo = data + process.argv[3] + " " + "\n";
	  	  fs.writeFile("./list.txt", todo, (err, data)=>{
			  if(err) console.log("error")
			  fs.readFile("./list.txt", 'utf-8', (err , data)=>{
				  console.log(data)
			  })
		  })
	})
}
if (process.argv[2] === 'remove'){
	fs.readFile("./list.txt", 'utf-8', (err, data)=>{
	     if (err) console.log("error")
		 let data_array = data.split("\n");
		 let remove = process.argv[3] - 1;
	     data_array.splice(remove, 1);
		let result = data_array.join("\n");
		 console.log(result);
		 fs.writeFile("./list.txt", result);
    })
}
if (process.argv[2] === 'reset'){
		const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});
	rl.question('Are you sure that you want to reset the list? if yes type yes / if no type no: ', (answer) => {
		if (answer.trim() === "yes"){
			fs.readFile("./list.txt", 'utf-8', (err, data)=>{
	    	if(err) console.log( "error" )
		    console.log( "Removed" )
			rl.close();	 
		    fs.writeFile("./list.txt", " ")
	  })
   } else if(answer.trim() === "no"){
	   fs.readFile("./list.txt", 'utf-8', (err, data)=>{
		   rl.close();	
		   console.log(data)	   
	   })
   }	
})
	
}

