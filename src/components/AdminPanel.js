import React, { useState } from "react";

const AdminPanel = ({ contract }) => {
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle errors

  // Function to validate the address format
  const isValidAddress = (address) => {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address); // Basic Ethereum address validation
  };

  const addToWhitelist = async () => {
    if (!isValidAddress(whitelistAddress)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      setError(""); // Clear any previous errors
      const tx = await contract.addToWhitelist(whitelistAddress);
      await tx.wait();
      alert("Address added to whitelist");
    } catch (error) {
      console.error("Error adding to whitelist:", error);
      setError("Failed to add address to whitelist. Please try again."); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const startDistribution = async () => {
    try {
      setLoading(true); // Set loading state to true
      setError(""); // Clear any previous errors
      const tx = await contract.startDistribution();
      await tx.wait();
      alert("Distribution started!");
    } catch (error) {
      console.error("Error starting distribution:", error);
      setError("Failed to start distribution. Please try again."); // Set error message
    } finally {
      setLoading(false); // Reset loading state
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
        <button onClick={addToWhitelist} disabled={loading}>
          {loading ? "Adding..." : "Add to Whitelist"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if any */}
      <button onClick={startDistribution} disabled={loading}>
        {loading ? "Starting..." : "Start Distribution"}
      </button>
    </div>
  );
};

export default AdminPanel;
