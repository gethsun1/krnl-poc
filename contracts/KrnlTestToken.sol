// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {KrnlRegistered, KrnlPayload} from "./KrnlRegistered.sol"; // Import KRNL Protocol

contract KRNLTestToken is ERC20, Ownable, KrnlRegistered {
    mapping(address => bool) public whitelist_;
    mapping(address => bool) public claimed;
    bool public distributionStarted_;

    event Whitelisted(address indexed _address);
    event TokensClaimed(address indexed _address, uint256 amount);
    event DistributionStarted();
    event DistributionStopped();

    // Specify custom decimals here
    uint8 private constant CUSTOM_DECIMALS = 0;

    // Constructor to initialize the KRNL protocol with token authority public key
    constructor(address _tokenAuthorityPublicKey) 
        ERC20("KRNL Test Token", "KRNL")
        KrnlRegistered(_tokenAuthorityPublicKey) // Pass the token authority public key correctly as address
    {
        _mint(msg.sender, 1000000); // Mint the total supply to the contract owner
    }

    function decimals() public view virtual override returns (uint8) {
        return CUSTOM_DECIMALS;
    }

    // Add an address to the whitelist
    function addToWhitelist(address _address) public onlyOwner {
        whitelist_[_address] = true;
        emit Whitelisted(_address);
    }

    // Add multiple addresses to the whitelist
    function addToWhitelistBatch(address[] calldata _addresses) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist_[_addresses[i]] = true;
            emit Whitelisted(_addresses[i]);
        }
    }

    // Start the token distribution
    function startDistribution() public onlyOwner {
        distributionStarted_ = true;
        emit DistributionStarted();
    }

    // Stop the token distribution
    function stopDistribution() public onlyOwner {
        distributionStarted_ = false;
        emit DistributionStopped();
    }

    // Claim tokens with KRNL Protocol authorization check
    function claimTokens(
        bytes calldata params, 
        KrnlPayload calldata krnlPayload // Ensure KrnlPayload is calldata
    ) 
        public 
        onlyAuthorized(krnlPayload, params) // Ensure the modifier matches the types
    {
        require(distributionStarted_, "Distribution not started");
        require(whitelist_[msg.sender], "Not on whitelist");
        require(!claimed[msg.sender], "Tokens already claimed");

        claimed[msg.sender] = true;
        _transfer(owner(), msg.sender, 1000); // Transfer 1000 tokens to the caller
        emit TokensClaimed(msg.sender, 1000);
    }
}
