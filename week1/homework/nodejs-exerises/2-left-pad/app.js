const leftPad  = require('left-pad');

function padLeftFunc(number) {
  console.log(leftPad(number, 8 , " "));
}

padLeftFunc(12312332)
padLeftFunc(5698)
padLeftFunc(08296)
padLeftFunc(32)