import app from './app.js';

const port = 3000;

export const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});