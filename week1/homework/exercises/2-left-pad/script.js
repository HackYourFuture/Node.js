/**
 ** Exercise 2: To the left, to the left...
 * 
 * Copy and paste your code from the previous exercise.
 * Replace the function `padLeft` to use
 * this new NPM package called `left-pad` instead then
 * Pad the numbers to 8 characters to confirm that it works correctly
 *
 */



// YOUR CODE GOES HERE
let numbers = [ "12", "846", "2", "1236" ];
const padLeft=require('left-pad')
numbers.forEach((el)=>{
    console.log(padLeft(el,8,'_'))
})
