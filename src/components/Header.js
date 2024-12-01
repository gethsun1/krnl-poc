import React from "react";

const Header = ({ connectWallet, userAddress }) => {
  return (
    <header className="header">
      <h1>Welcome To KRNL PoC DApp</h1>
      <button onClick={connectWallet} disabled={userAddress}>
        {userAddress ? `Connected: ${userAddress.substring(0, 6)}...` : "Connect Wallet"}
      </button>
    </header>
  );
};

export default Header;
