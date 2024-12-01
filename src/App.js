import React, { useState } from "react";
import { ethers } from "ethers"; // Correct import for Ethers.js
import Web3Modal from "web3modal";
import Header from "./components/Header";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";
import "./css/styles.css";

// ABI and contract address
const contractABI = [ /* Your contract's ABI here */ ];
const contractAddress = "0xYourContractAddress";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const tempProvider = new ethers.BrowserProvider(instance); // Updated provider reference
      const tempSigner = await tempProvider.getSigner();
      const tempContract = new ethers.Contract(contractAddress, contractABI, tempSigner);

      setProvider(tempProvider);
      setSigner(tempSigner);
      setContract(tempContract);

      const user = await tempSigner.getAddress();
      setUserAddress(user);

      // Check if user is the contract owner
      const owner = await tempContract.owner();
      setIsOwner(owner.toLowerCase() === user.toLowerCase());
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="app">
      <Header connectWallet={connectWallet} userAddress={userAddress} />
      {isOwner ? (
        <AdminPanel contract={contract} />
      ) : (
        <UserPanel contract={contract} userAddress={userAddress} />
      )}
    </div>
  );
}

export default App;
