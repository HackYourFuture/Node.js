module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current" // чтобы Jest понимал текущую версию Node ===  for Jest to understand the current Node version
        }
      }
    ]
  ]
};
