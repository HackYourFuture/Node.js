function add(x, y) {
  return x + y;
}

const two = 2;

// exports is a special object that is available in Node.js
exports.add = add;
exports.two = two;

// best practice is to only have definitions in here
