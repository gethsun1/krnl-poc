import React, { useState, useEffect } from "react";

const UserPanel = ({ contract, userAddress }) => {
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const isWhitelisted = await contract.whitelist_(userAddress);
        const hasClaimed = await contract.claimed(userAddress);
        setCanClaim(isWhitelisted && !hasClaimed);
      } catch (error) {
        console.error("Error checking eligibility:", error);
      }
    };

    if (contract && userAddress) {
      checkEligibility();
    }
  }, [contract, userAddress]);

  const claimTokens = async () => {
    try {
      const tx = await contract.claimTokens();
      await tx.wait();
      alert("Tokens claimed!");
    } catch (error) {
      console.error("Error claiming tokens:", error);
    }
  };

  return (
    <div className="user-panel">
      <h2>User Panel</h2>
      {canClaim ? (
        <button onClick={claimTokens}>Claim 1000 KRNL Tokens</button>
      ) : (
        <p>You are not eligible to claim tokens.</p>
      )}
    </div>
  );
};

export default UserPanel;
