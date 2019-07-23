'use strict';

const handleError = error => {
  return { Oops: error.message };
};

module.exports = handleError;
