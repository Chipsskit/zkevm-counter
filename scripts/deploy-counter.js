const hre = require("hardhat");

async function main() {
  const CounterContractFactory = await hre.ethers.getContractFactory("Counter");
  const counterContract = await CounterContractFactory.deploy();

  await counterContract.waitForDeployment();

  console.log(
    `Counter contract deployed to https://explorer.public.zkevm-test.net/address/${counterContract.target}`
  );
  console.log(counterContract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


