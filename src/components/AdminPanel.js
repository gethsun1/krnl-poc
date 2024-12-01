import React, { useState } from "react";

const AdminPanel = ({ contract }) => {
  const [whitelistAddress, setWhitelistAddress] = useState("");

  const addToWhitelist = async () => {
    try {
      const tx = await contract.addToWhitelist(whitelistAddress);
      await tx.wait();
      alert("Address added to whitelist");
    } catch (error) {
      console.error("Error adding to whitelist:", error);
    }
  };

  const startDistribution = async () => {
    try {
      const tx = await contract.startDistribution();
      await tx.wait();
      alert("Distribution started!");
    } catch (error) {
      console.error("Error starting distribution:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div>
        <input
          type="text"
          placeholder="Address to whitelist"
          value={whitelistAddress}
          onChange={(e) => setWhitelistAddress(e.target.value)}
        />
        <button onClick={addToWhitelist}>Add to Whitelist</button>
      </div>
      <button onClick={startDistribution}>Start Distribution</button>
    </div>
  );
};

export default AdminPanel;
