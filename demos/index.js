var sayHello = require('./helloWorld')
const fs = require('fs')
console.log("1 About to call file write");

fs.writeFile('./hello.txt', sayHello(), function(err, result){
  if(err) return console.error(err);

  console.log("2 uff finally done");
})

var txt = fs.readFile('./hello.txt', function(err, result){
  if(err) return console.error(err);
  console.log( "3 ",result.toString() );
  return  result.toString() ;
})

console.log(txt);
console.log("4 waiting for the file write");

var txtS = fs.readFile('./hello.txt', function(e, r){
  console.log("4.5" +r);
})

console.log("5"+  txtS + " v2");
console.log("6 end: The code was blocked");
