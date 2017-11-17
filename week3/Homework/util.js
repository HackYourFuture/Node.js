const fs = require('fs');
const data_path = 'todos.json';

function readFile(){
	return new Promise(
	(resolve, reject) => {
		fs.readFile(data_path, 'utf8', function (err,file_data) {
			if (err) {
				reject(err);
			}
			else{
				resolve(JSON.parse(file_data));
			}
		});
	});
}
function writeFile(obj){
	return new Promise(
	(resolve, reject) => {
		fs.writeFile(data_path, JSON.stringify(obj), function (err) {
			if (err) {
				reject(err);
			}
			else{
				resolve(obj);
			}
		});
	});
}
module.exports = {readFile , writeFile}