function padLeft(val, num, str) {
  return '0000'.replace(/0/g, str).slice(0, num - val.length) + val;
};
module.exports.pad = padLeft;