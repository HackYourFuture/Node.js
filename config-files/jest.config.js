export default {
  // Tells jest that any file that has 2 .'s in it and ends with either js or jsx should be run through the babel-jest transformer
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // By default our `node_modules` folder is ignored by jest, this tells jest to transform those as well
  transformIgnorePatterns: [],
};
