const uuidv1 = require('uuid/v1');
const util = require("./util.js");

function list(response){
    util.readFile()
    .then((result) => {response.json(result);response.end();})
	.catch((error) => console.log(error));
}
function remove(response , key){
    util.readFile()
    .then((obj) => {
        if(!obj.hasOwnProperty(key)){
			return {"Error" : "id is not exist!"};
		}
		else{
			delete obj[key]; 
			return util.writeFile(obj) 
		}
	})
	.then((result) => {response.json(result);response.end();}) 
	.catch((error) => console.log(error));
}
function create(response , desc){
    let key = uuidv1();
    util.readFile()
    .then((obj) => {
        obj[key] = desc;
		return util.writeFile(obj)
	})
	.then((result) => {response.json(result);response.end();}) 
	.catch((error) => console.log(error));
}
function update(response , key , desc){
    util.readFile()
    .then((obj) => {
        if(!obj.hasOwnProperty(key))
			return {"Error" : "id is not exist!"};
		else{
			obj[key] = desc;
			return util.writeFile(obj)
		}
	})
	.then((result) => {response.json(result);response.end();}) 
	.catch((error) => console.log(error));
}

module.exports = {list , remove , create , update}