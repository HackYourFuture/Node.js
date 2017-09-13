import HTTP from 'http'
 
const homePageVar = 10;
module.exports = {
    "body" : function contentHomePage(Response ){
        Response.write('<h1>somur home page</h1>')
        console.log('this is the content of home page ')
        Response.end();
    },
    "number" :  homePageVar  
}



 

 