'use strict';
let fs = require('fs');
function readFile(file_Name) {
    return new Promise((resolve, reject) => {
           fs.readFile(file_Name,(err,data)=>{
if(err){
reject(err);

}else{
   resolve( data)
   
}
           })
    })
}

function writFile(file_Name,data) {
    return new Promise((resolve, reject) => {

        fs.writeFile(file_Name,JSON.stringify(data), (err, data) => {
         if(err){
reject(err);

         }else{

            resolve(data)
         }
        })
    })
}

module.exports = { 
writeFile : writFile ,
readFile : readFile

}