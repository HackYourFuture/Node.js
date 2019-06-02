function e404(error) {
  if (error.code === 'ENOENT') {
    console.log('no data found');
  } else {
    console.log(error);
  }
}


module.exports = { e404: e404 }