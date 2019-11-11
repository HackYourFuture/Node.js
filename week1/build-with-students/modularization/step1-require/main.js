// require is a special function that is available in node.js
// it reads the module/package (in this case a file) and executes it
const math = require("./math.js");

console.log(math.add(math.two, 2));