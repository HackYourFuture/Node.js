let arguments = process.argv;
const file = arguments.slice(2);

const retrieve = argument => arguments.includes(argument);

module.exports = {
  file,
  retrieve,
};
