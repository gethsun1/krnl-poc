# KRNL Proof of Concept (PoC) DApp

[![krnl.png](https://i.postimg.cc/tJGnBp7n/krnl.png)](https://postimg.cc/S2VKs06m)

---

Welcome to the KRNL Proof of Concept (PoC) DApp repository! This project demonstrates the KRNL protocol's functionality and showcases the processes behind customizing and interacting with KRNL tokens, including setting up the **Custom Opinion Maker**, managing the **Custom Token Authority**, and upgrading **KrnlTestToken** for registration to **Kenrnels** within the KRNL ecosystem.

This readme will guide you through the key processes for setting up and using the KRNL DApp.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Setting Up the Development Environment](#setting-up-the-development-environment)
4. [Custom Opinion Maker Setup](#custom-opinion-maker-setup)
5. [Custom Token Authority Setup](#custom-token-authority-setup)
6. [Upgrading KrnlTestToken for Registration to Kenrnels](#upgrading-krnltesttoken-for-registration-to-kenrnels)
7. [Interacting with the DApp](#interacting-with-the-dapp)
8. [Troubleshooting](#troubleshooting)
9. [License](#license)

---

## Project Overview

The KRNL DApp is designed to work with the **KRNL Protocol**, which allows users to interact with **Kenrnels**, a decentralized platform for registering custom tokens. This PoC demonstrates the core functionality, including token management, adding tokens to whitelists, claiming tokens, and initiating distribution.

The key components in the project are:
- **Custom Opinion Maker**: A decentralized mechanism that allows users to express opinions and vote on token-related decisions.
- **Custom Token Authority**: The entity responsible for minting, transferring, and managing tokens within the KRNL ecosystem.
- **KrnlTestToken**: The token used for testing purposes, which can be upgraded to be registered with Kenrnels.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v14.x or higher)
2. **npm** or **yarn** for package management
3. **MetaMask** or another Web3 wallet for interacting with the DApp
4. **Ethers.js** or **Web3Modal** for Ethereum interaction
5. **Solidity** development environment (e.g., **Truffle**, **Hardhat**, **Remix**)


### Clone the repository:

```
git clone https://github.com/gethsun1/krnl-poc.git
cd krnl-poc

```


## Setting Up the Development Environment

### Install Dependencies:

The project uses React for the frontend and ethers.js for interacting with Ethereum-based smart contracts.  
Run the following command to install dependencies:

```
npm install

```

## Set Up Web3Modal:
This DApp integrates Web3Modal for connecting wallets to the application. It’s important that MetaMask or any Web3-compatible wallet is installed and configured in your browser.

### Compile the Smart Contracts:
If you're deploying or testing your own version of the contract, make sure the smart contracts are compiled and migrated correctly using Hardhat or Truffle.

## Custom Opinion Maker Setup
The Custom Opinion Maker is the foundation of decision-making within the KRNL DApp, enabling the community or users to propose opinions that can influence the ecosystem.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract CustomOpinionMaker is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    struct Execution {
        uint kernelId;
        bytes result;
        bytes proof;
        bool isValidated;
    }

    struct KernelResult {
        address addr;
        bool flag;
        string name;
        uint score;
    }

    // Function to get an opinion based on execution plans
    function getOpinion(bytes calldata executionPlan, uint kernelId)
        external
        view
        onlyOwner
        returns (bool opinion, bool isFinalized, bytes memory updatedPlan)
    {
        (opinion, isFinalized, updatedPlan) = _validateExecution(executionPlan, kernelId);
    }

    // Internal validation logic
    function _validateExecution(bytes calldata executionPlan, uint kernelId)
        private
        pure
        returns (bool opinion, bool isFinalized, bytes memory updatedPlan)
    {
        Execution[] memory executions = abi.decode(executionPlan, (Execution[]));

        for (uint i = 0; i < executions.length; i++) {
            Execution memory execution = executions[i];
            if (execution.kernelId == kernelId) {
                if (kernelId == 1) {
                    // Custom Criteria for Kernel 1
                    (bool success, uint value) = abi.decode(execution.result, (bool, uint));
                    (bool proofValid) = abi.decode(execution.proof, (bool));
                    if (success && value > 100 && proofValid) {
                        opinion = true;
                    } else {
                        isFinalized = true;
                    }
                } else if (kernelId == 2) {
                    // Custom Criteria for Kernel 2
                    (KernelResult memory res) = abi.decode(execution.result, (KernelResult));
                    (bool proofValid) = abi.decode(execution.proof, (bool));
                    if (res.flag && res.addr != address(0) && proofValid) {
                        opinion = true;
                    } else {
                        isFinalized = true;
                    }
                }

                if (i == executions.length - 1) {
                    isFinalized = true;
                }

                executions[i].isValidated = true;
                break;
            }
        }

        updatedPlan = abi.encode(executions);
    }
}

```

### Deploy the Custom Opinion Maker Contract
In your development environment, navigate to the CustomOpinionMaker.sol contract file and deploy it to your chosen test network.

After deploying the contract, update the address in your DApp configuration so users can interact with the Custom Token Authority (minting tokens and adding/removing whitelisted addresses).

Upgrading KrnlTestToken for Registration to Kenrnels
Once the KrnlTestToken is deployed and tested, it can be upgraded for registration to the Kenrnels platform, making it a valid token within the KRNL ecosystem.

### Step-by-Step Process:
1. Deploy the KrnlTestToken:
The KrnlTestToken contract should initially be deployed to a test network for thorough testing. It can be based on the ERC-20 standard and include functions for token transfer, minting, and claiming.

2. Register KrnlTestToken with Kenrnels:
To upgrade the token for registration in Kenrnels, we need to make sure that the token meets the necessary requirements.
You will need to interact with the KenrnelsRegistry contract that manages registered tokens:

### Interacting with the DApp
Once everything is set up, you can interact with the DApp:

## Connect Wallet:
Use Web3Modal to connect a wallet like MetaMask.

## Admin Panel:
Whitelist Addresses: Admins can add addresses to the whitelist and initiate token distribution.
Start Distribution: Admins can start the distribution process, triggering the claim functionality for eligible users.
## User Panel:
Claim Tokens: Whitelisted users who have not claimed tokens can claim their 1000 KRNL tokens by interacting with the smart contract.

### Troubleshooting
Error: "Address not whitelisted": Ensure that the user address is correctly added to the whitelist in the Custom Token Authority contract.
Error: "Failed to claim tokens": Make sure that the user is eligible (i.e., they are whitelisted and have not yet claimed tokens).
Transaction Failed: Check if the contract has sufficient gas and the network is functioning correctly.

### License
This project is licensed under the MIT License. See the LICENSE file for more information.

With these steps, you should have a fully functional KRNL PoC DApp. Feel free to explore the features, make improvements, or integrate with other parts of the KRNL ecosystem.













