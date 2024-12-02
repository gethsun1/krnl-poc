import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers"; 
import Web3Modal from "web3modal";
import Header from "./components/Header";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";
import abi from "./abi.json"; 
import "./css/styles.css";

const contractAddress = "0x28ffd222188426a9583d890fc0bbf95e5b3f81b1";

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

      // Create provider and signer using ethers 6.x
      const tempProvider = new BrowserProvider(instance);
      const tempSigner = await tempProvider.getSigner();
      const tempContract = new Contract(contractAddress, abi, tempSigner);

      // Save to state
      setProvider(tempProvider);
      setSigner(tempSigner);
      setContract(tempContract);

      // Fetch and set user address
      const user = await tempSigner.address; 
      setUserAddress(user);

      // Fetch and set ownership status
      const owner = await tempContract.owner();
      setIsOwner(owner.toLowerCase() === user.toLowerCase());
    } catch (error) {
      console.error("Error connecting wallet:", error.message || error);
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
