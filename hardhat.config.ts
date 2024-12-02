import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify"

import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24", 
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true 
    }
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY_SEPOLIA}`],
    },
    'sapphire-testnet': {
      url: `https://testnet.sapphire.oasis.io`,
      chainId: 23295,
      accounts: [`0x${process.env.PRIVATE_KEY_OASIS}`],
    },
    'devnet': {
      url: `${process.env.DEVNET_RPC}`,
      chainId: 14121,
      accounts: [`0x${process.env.PRIVATE_KEY_DEVNET}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}

export default config;
