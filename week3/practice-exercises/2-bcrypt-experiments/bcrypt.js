import { hash, compare } from 'bcrypt';



const experiment1 = async () => {
  const password = "HackMyFuture";
  // Add your code here
};

const experiment2 = async () => {
  
}

const experiment3 = async () => {
  console.time("Hashing time");
  // Hash
  console.timeEnd("Hashing time");
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