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

npm install
# or
yarn install

