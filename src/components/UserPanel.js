import React, { useState, useEffect } from "react";

const UserPanel = ({ contract, userAddress }) => {
  const [canClaim, setCanClaim] = useState(false);
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle errors

  useEffect(() => {
    const checkEligibility = async () => {
      setLoading(true); // Start loading when checking eligibility
      setError(""); // Clear any previous errors

      try {
        const isWhitelisted = await contract.whitelist_(userAddress);
        const hasClaimed = await contract.claimed(userAddress);
        setCanClaim(isWhitelisted && !hasClaimed);
      } catch (error) {
        console.error("Error checking eligibility:", error);
        setError("Failed to check eligibility. Please try again later.");
      } finally {
        setLoading(false); // End loading after checking eligibility
      }
    };

    if (contract && userAddress) {
      checkEligibility();
    }
  }, [contract, userAddress]);

  const claimTokens = async () => {
    setLoading(true); // Set loading state to true when claiming tokens
    setError(""); // Clear any previous errors

    try {
      const tx = await contract.claimTokens();
      await tx.wait();
      alert("Tokens claimed!");
      setCanClaim(false); // Disable the claim button after successful claim
    } catch (error) {
      console.error("Error claiming tokens:", error);
      setError("Failed to claim tokens. Please try again later.");
    } finally {
      setLoading(false); // End loading after claiming tokens
    }
  };

  return (
    <div className="user-panel">
      <h2>User Panel</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      {loading ? (
        <p>Loading...</p> // Show loading text during any async operation
      ) : canClaim ? (
        <button onClick={claimTokens} disabled={loading}>Claim 1000 KRNL Tokens</button>
      ) : (
        <p>You are not eligible to claim tokens.</p>
      )}
    </div>
  );
};

export default UserPanel;
