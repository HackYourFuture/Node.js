var fs = require('fs');
var data = require('./data1.json');
console.log(data.name);
//
fs.readdir('../hameed_hw', function(err, data) {
    console.log(data);
});

fs.readFile('./data1.json', 'utf-8', function(err, data) {
    
    data = JSON.parse(data);
    console.log(data);
});