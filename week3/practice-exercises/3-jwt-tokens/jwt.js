import jwt from 'jsonwebtoken';

const experiment1 = async () => {
  const payload = { userId: 123, username: 'Alex' };
  const secret = 'HackMyFuture';
  // Add your code here
};

const experiment2 = async () => {
  const payload = { userId: 123, username: 'Alex' };
    // Add your code here
}

const experiment3 = async () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwidXNlcm5hbWUiOiJCb2IiLCJpYXQiOjE3NTUwOTc1ODN9.ioN3ccbmfyTnnPT0uc54wvsVtoOXqYNkwLytF8XI5ac`;
  // Add your code here
};



const main = async () => {

  console.log("Experiment 1:")
  await experiment1();

  console.log("\nExperiment 2:")
  await experiment2();

  console.log("\nExperiment 3:")
  await experiment3();
};


main().catch(console.error);