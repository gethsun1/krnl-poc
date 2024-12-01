import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

  const Contract = await ethers.getContractFactory("CustomTokenAuthority");
  const contract = await Contract.deploy("0x3535448e2AAa9EfB9F575F292C904d383EDa9352", "0x4CE38d5B947994f07D791D154E9963734E2C444c");

  console.log("Contract deployed to:", contract.target);
  console.log("Contract: ", contract)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
