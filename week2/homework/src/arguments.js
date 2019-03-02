/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Arguments
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const arguments = process.argv;
arguments.splice(0, 2);

/**~~~~~~~~~~~~~~~~~~~~~~~~~
     Retrieve
  ~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const retrieve = argument => arguments.includes(argument);
/**~~~~~~~~~~~~~~~~~~~~~~~~~
     Module Exports
  ~~~~~~~~~~~~~~~~~~~~~~~~~~*/
module.exports = {
  arguments,
  retrieve,
};
