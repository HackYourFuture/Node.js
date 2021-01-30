if (process.argv[2]) {
  const newArray = process.argv.slice(2)
    .map(Number)
    .reduce((a, b) => a + b)
  console.log(newArray)
}








