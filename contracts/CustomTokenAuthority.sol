// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";
import "@oasisprotocol/sapphire-contracts/contracts/EthereumUtils.sol";

    // Constructor to set initial owner and initialize keys
contract CustomTokenAuthority is Ownable {
    struct Keypair {
        bytes pubKey;
        bytes privKey;
    }

    struct Execution {
        uint256 kernelId;
        bytes result;
        bytes proof;
        bool isValidated;
    }

    Keypair private signingKeypair;
    Keypair private accessKeypair;
    bytes32 private signingKeypairRetrievalPassword;
    address private opinionMaker;

    mapping(address => bool) private whitelist;
    mapping(bytes32 => bool) private runtimeDigests;
    mapping(uint256 => bool) private allowedKernels;

    constructor(address _initialOwner, address _opinionMaker) Ownable(_initialOwner) {
        require(_initialOwner != address(0), "Owner address cannot be zero");
        require(_opinionMaker != address(0), "Opinion maker address cannot be zero");
        opinionMaker = _opinionMaker;
    }


    // Keypair generation function
    function generateKey() external onlyOwner {
        bytes memory seed = Sapphire.randomBytes(32, "");
        (bytes memory pubKey, bytes memory privKey) = Sapphire.generateSigningKeyPair(
            Sapphire.SigningAlg.Secp256k1PrehashedKeccak256,
            seed
        );
        signingKeypair = Keypair(pubKey, privKey);
        accessKeypair = Keypair(pubKey, privKey); // Example - update appropriately
    }

    // Updates the opinion maker address
    function setOpinionMaker(address newOpinionMaker) external onlyOwner {
        require(newOpinionMaker != address(0), "Invalid opinion maker address");
        opinionMaker = newOpinionMaker;
    }

    // Allows the owner to update the signing keypair
    function setSigningKeypair(bytes calldata pubKey, bytes calldata privKey) external onlyOwner {
        signingKeypair = Keypair(pubKey, privKey);
    }

    // Sets a password for retrieving the private signing key
    function setSigningKeypairRetrievalPassword(string calldata password) external onlyOwner {
        signingKeypairRetrievalPassword = keccak256(abi.encodePacked(password));
    }

    // Returns the public key and its derived Ethereum address
    function getSigningKeypairPublicKey() external view returns (bytes memory, address) {
        address signingKeypairAddress = EthereumUtils.k256PubkeyToEthereumAddress(signingKeypair.pubKey);
        return (signingKeypair.pubKey, signingKeypairAddress);
    }

    // Returns the private key if the correct password is provided
    function getSigningKeypairPrivateKey(string calldata password) external view onlyOwner returns (bytes memory) {
        require(
            signingKeypairRetrievalPassword == keccak256(abi.encodePacked(password)),
            "Invalid password"
        );
        return signingKeypair.privKey;
    }

    // Adds or removes a kernel node from the whitelist
    function setWhitelist(address kernelNodePubKey, bool isAllowed) external onlyOwner {
        whitelist[kernelNodePubKey] = isAllowed;
    }

    // Updates the runtime digest state
    function setRuntimeDigest(bytes32 runtimeDigest, bool isAllowed) external onlyOwner {
        runtimeDigests[runtimeDigest] = isAllowed;
    }

    // Adds or removes an allowed kernel
    function setKernel(uint256 kernelId, bool isAllowed) external onlyOwner {
        allowedKernels[kernelId] = isAllowed;
    }

    // Checks if a kernel is allowed (no modifier needed)
    function isKernelAllowed(uint256 kernelId) external view returns (bool) {
            return allowedKernels[kernelId];
    }
    modifier onlyAllowedKernel(uint256 kernelId) {
        require(allowedKernels[kernelId], "Kernel is not allowed");
        _;
    }

    // Retrieves an opinion for a given kernel ID
 function getOpinion(uint256 kernelId)
    external
    view
    onlyAllowedKernel(kernelId)
    returns (bool, bool, bytes memory)
{
    (bool success, bytes memory data) = opinionMaker.staticcall(
        abi.encodeWithSignature("getOpinion(uint256)", kernelId)
    );
    require(success, "Opinion retrieval failed");

    (bool opinion, bool isFinalized, bytes memory updatedPlan) = abi.decode(data, (bool, bool, bytes));
    return (opinion, isFinalized, updatedPlan);
}


    // Signs kernel-related data and returns the results
    function sign(
        address senderAddress,
        bytes calldata /* executionPlan */,
        bytes calldata functionParams,
        bytes calldata kernelParamObjects,
        bytes calldata kernelResponses
    ) external view returns (bytes memory, bytes32, bytes memory, bytes32) {
        bytes32 functionParamsDigest = keccak256(abi.encode(functionParams));
        bytes32 kernelParamObjectsDigest = kernelParamObjects.length > 0
            ? keccak256(abi.encode(kernelParamObjects))
            : bytes32(0);
        bytes32 dataDigest = keccak256(
            abi.encode(functionParamsDigest, kernelParamObjectsDigest, senderAddress)
        );
        bytes32 kernelResponsesDigest = keccak256(abi.encode(kernelResponses, senderAddress));

        bytes memory kernelResponsesSignature = Sapphire.sign(
            Sapphire.SigningAlg.Secp256k1PrehashedKeccak256,
            abi.encodePacked(signingKeypair.privKey),
            abi.encode(kernelResponsesDigest),
            ""
        );

        bytes32 nonce = bytes32(Sapphire.randomBytes(32, ""));
        bytes memory signatureToken = Sapphire.sign(
            Sapphire.SigningAlg.Secp256k1PrehashedKeccak256,
            abi.encodePacked(signingKeypair.privKey),
            abi.encode(dataDigest, nonce),
            ""
        );

        return (kernelResponsesSignature, kernelResponsesDigest, signatureToken, nonce);
    }
}
