// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KRNLTestToken is ERC20, Ownable {
    mapping(address => bool) public whitelist_;
    mapping(address => bool) public claimed;
    bool public distributionStarted_;

    event Whitelisted(address indexed _address);
    event TokensClaimed(address indexed _address, uint256 amount);
    event DistributionStarted();
    event DistributionStopped();

    // Specify custom decimals here
    uint8 private constant CUSTOM_DECIMALS = 0;

    constructor() ERC20("KRNL Test Token", "KRNL") Ownable(msg.sender) {
        _mint(msg.sender, 1000000); // Mint the total supply to the contract owner
    }

    function decimals() public view virtual override returns (uint8) {
        return CUSTOM_DECIMALS;
    }

    function addToWhitelist(address _address) public onlyOwner {
        whitelist_[_address] = true;
        emit Whitelisted(_address);
    }

    function addToWhitelistBatch(address[] calldata _addresses) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist_[_addresses[i]] = true;
            emit Whitelisted(_addresses[i]);
        }
    }

    function startDistribution() public onlyOwner {
        distributionStarted_ = true;
        emit DistributionStarted();
    }

    function stopDistribution() public onlyOwner {
        distributionStarted_ = false;
        emit DistributionStopped();
    }

    function claimTokens() public {
        require(distributionStarted_, "Distribution not started");
        require(whitelist_[msg.sender], "Not on whitelist");
        require(!claimed[msg.sender], "Tokens already claimed");

        claimed[msg.sender] = true;
        _transfer(owner(), msg.sender, 1000); // Transfer 1000 tokens to the caller
        emit TokensClaimed(msg.sender, 1000);
    }
}
