// jest.config.js
export default {
    transform: {
      "^.+\\.js$": "babel-jest"
    },
    testEnvironment: "node",
    transformIgnorePatterns: [
      //Transform all ESM modules we depend on
      "node_modules/(?!(node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)"
    ]
  };
  