import { ethers } from "hardhat";
import * as dotenv from "dotenv";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  const walletAddress = deployer.address;

  const ownerAddress = process.env.INITIAL_OWNER_ADDRESS || walletAddress;

  console.log("======================================")
  console.log("DEPLOYER:", walletAddress);
  console.log("Owner address for OM and TA:", ownerAddress)
  console.log("======================================")


  // OPINION MAKER
  console.log("START CUSTOM DEPLOYING OPINION MAKER")
  const providerOpinionMaker = new ethers.JsonRpcProvider(`https://testnet.sapphire.oasis.io`);
  const walletOpinionMaker = new ethers.Wallet(`${process.env.PRIVATE_KEY_OASIS}`, providerOpinionMaker);
  const ContractOpinionMaker = await ethers.getContractFactory("CustomOpinionMaker", walletOpinionMaker);
  const contractOpinionMaker = await ContractOpinionMaker.deploy(ownerAddress);

  console.log("DEPLOYED CUSTOM  OPINION MAKER")
  const addressOpinionMaker = contractOpinionMaker.target;
  console.log("Contract deployed to:", addressOpinionMaker);
  //   console.log("Contract: ", contractOpinionMaker)
  console.log("======================================")



  // TOKEN AUTHORITY
  console.log("START DEPLOYING CUSTOM TOKEN AUTHORITY")
  await new Promise(r => setTimeout(r, 15000)); // timer to prevent contract crashes
  const providerTokenAuthority = new ethers.JsonRpcProvider(`https://testnet.sapphire.oasis.io`);
  const walletTokenAuthority = new ethers.Wallet(`${process.env.PRIVATE_KEY_OASIS}`, providerTokenAuthority);
  const ContractTokenAuthority = await ethers.getContractFactory("CustomTokenAuthority", walletTokenAuthority);
  const contractTokenAuthority = await ContractTokenAuthority.deploy(ownerAddress, addressOpinionMaker);

  console.log("DEPLOYED CUSTOM TOKEN AUTHORITY")
  const addressTokenAuthority = contractTokenAuthority.target;
  console.log("Contract deployed to:", addressTokenAuthority);
  //   console.log("Contract: ", contractTokenAuthority)
  await new Promise(r => setTimeout(r, 15000)); // timer to prevent contract crashes
  const [TAPublicKeyHash, TAPublicKeyAddress] = await contractTokenAuthority.getSigningKeypairPublicKey();

  console.log("Token Authority Public Key in hash value:",TAPublicKeyHash)
  console.log("Token Authority Public Key in address value:", TAPublicKeyAddress)
  console.log("======================================")



  console.log("=====SUMMARY=====")
  console.log("Opinion Maker - Oasis Sapphire testnet\nAddress:", addressOpinionMaker)
  console.log("\nToken Authority - Oasis Sapphire testnet\nAddress:", addressTokenAuthority)
  console.log("=================")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
