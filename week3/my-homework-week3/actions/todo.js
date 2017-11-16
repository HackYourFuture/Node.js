const readline = require("readline");
const fs = require('fs');
let jsonList = [];

let help = (req, res) => {
    fs.readFile('help.json', 'UTF-8', (err, data) => {
		if (err) console.log(err);
		JSON.parse(data)
        res.json(data).end()
	});
};

let add = (req, res)=>{
	let item = req.params.newItem;
	fs.readFile("./todo.json", 'utf-8', (err, data)=>{
		jsonList = JSON.parse(data);
		jsonList.push({"task":item})
		fs.writeFile("./todo.json", JSON.stringify(jsonList))
		fs.readFile('./todo.json', 'UTF-8', (err, data) =>{
			JSON.parse(data);
			res.json(data).end();
		})
	})
};

let delByID = (req, res)=>{
	let id = req.params.id;
	fs.readFile("./todo.json", 'utf-8', (err, data)=>{
	     if (err) console.log("error")
		jsonList = JSON.parse(data);
		jsonList.splice(id - 1, 1);
		 fs.writeFile("./todo.json", JSON.stringify(jsonList));
		fs.readFile('./todo.json', 'UTF-8', (err, data) =>{
			if (err) console.log("error");
			JSON.parse(data);
			res.json(data).end();
		})
    })
}

let reset = (req, res)=>{
	fs.readFile("./todo.json", 'utf-8', (err, data)=>{
		if (err) console.log("error")
		fs.writeFile("./todo.json", "[]");
		fs.readFile('./todo.json', 'utf-8', (err, data)=>{
			if (err) console.log("error");
			JSON.parse(data);
			res.json(data).end();
		})
	})
}

module.exports = {
	help,
	jsonList,
	add,
	delByID,
	reset
}
