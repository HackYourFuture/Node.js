import HTML from 'http'
var valu = 10
 
 

module.exports = {
    "varia" : valu,
    "func"  : function test(Response){
        Response.write(`
        <h1>Status Page</h1>
        <div>the variable value is :` + valu + `</div>
        `);
        
        Response.end();
        
    }
}