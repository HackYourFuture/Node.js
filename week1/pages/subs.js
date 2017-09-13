
import HTTP from 'http'
import STATUS  from './status.js'
 
 

module.exports = {
    "body" : function contentHomePage(Response ){
        STATUS.varia = STATUS.varia - 1  ;
        Response.write('<h1>subtract  one</h1>')
        console.log('this is the value of varia '+ STATUS.varia)
        Response.write(STATUS.varia.toString())
        Response.end();
        
    },
   
}
