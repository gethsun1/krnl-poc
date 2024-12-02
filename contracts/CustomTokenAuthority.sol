// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";
import "@oasisprotocol/sapphire-contracts/contracts/EthereumUtils.sol";

contract CustomTokenAuthority is Ownable {
    struct Keypair {
        bytes pubKey;
        bytes privKey;
    }

    struct Execution {
        uint kernelId;
        bytes result;
        bytes proof;
        bool isValidated;
    }

    Keypair private signingKeypair;
    Keypair private accessKeypair;
    bytes32 private signingKeypairRetrievalPassword;
    address private opinionMaker;

    mapping(address => bool) private whitelist; // Whitelisted addresses
    mapping(bytes32 => bool) private runtimeDigests; // Runtime digests
    mapping(uint => bool) private kernels; // Allowed kernel IDs

    constructor(address initialOwner, address _opinionMaker) Ownable(initialOwner) {
        signingKeypair = _generateKey();
        accessKeypair = _generateKey();
        opinionMaker = _opinionMaker;
    }

    modifier onlyAuthorized(bytes calldata auth) {
        (bytes32 entryId, bytes memory accessToken, bytes32 runtimeDigest, bytes memory runtimeDigestSignature) = abi.decode(auth, (bytes32, bytes, bytes32, bytes));
        require(_verifyAccessToken(entryId, accessToken), "Unauthorized: Invalid access token");
        _;
    }

    modifier onlyValidated(bytes calldata executionPlan) {
        require(_verifyExecutionPlan(executionPlan), "Invalid execution plan");
        _;
    }

    modifier onlyAllowedKernel(uint kernelId) {
        require(kernels[kernelId], "Kernel not allowed");
        _;
    }

    function _generateKey() private view returns (Keypair memory) {
        bytes memory seed = Sapphire.randomBytes(32, "");
        (bytes memory pubKey, bytes memory privKey) = Sapphire.generateSigningKeyPair(Sapphire.SigningAlg.Secp256k1PrehashedKeccak256, seed);
        return Keypair(pubKey, privKey);
    }

    function _verifyAccessToken(bytes32 entryId, bytes memory accessToken) private view returns (bool) {
        bytes memory digest = abi.encodePacked(keccak256(abi.encode(entryId)));
        return Sapphire.verify(Sapphire.SigningAlg.Secp256k1PrehashedKeccak256, accessKeypair.pubKey, digest, "", accessToken);
    }

    function _verifyRuntimeDigest(bytes32 runtimeDigest, bytes memory runtimeDigestSignature) private view returns (bool) {
        bytes32 digest = MessageHashUtils.toEthSignedMessageHash(runtimeDigest);
        address recoveredPubKey = ECDSA.recover(digest, runtimeDigestSignature);
        return whitelist[recoveredPubKey];
    }

    function _verifyExecutionPlan(bytes calldata executionPlan) private pure returns (bool) {
        Execution[] memory executions = abi.decode(executionPlan, (Execution[]));
        for (uint i = 0; i < executions.length; i++) {
            if (!executions[i].isValidated) {
                return false;
            }
        }
        return true;
    }

    function setOpinionMaker(address _opinionMaker) external onlyOwner {
        opinionMaker = _opinionMaker;
    }

    function setSigningKeypair(bytes calldata pubKey, bytes calldata privKey) external onlyOwner {
        signingKeypair = Keypair(pubKey, privKey);
    }

    function setSigningKeypairRetrievalPassword(string calldata _password) external onlyOwner {
        signingKeypairRetrievalPassword = keccak256(abi.encodePacked(_password));
    }

    function getSigningKeypairPublicKey() external view returns (bytes memory, address) {
        address signingKeypairAddress = EthereumUtils.k256PubkeyToEthereumAddress(signingKeypair.pubKey);
        return (signingKeypair.pubKey, signingKeypairAddress);
    }

    function getSigningKeypairPrivateKey(string calldata _password) external view onlyOwner returns (bytes memory) {
        require(signingKeypairRetrievalPassword == keccak256(abi.encodePacked(_password)), "Invalid password");
        return signingKeypair.privKey;
    }

    function setWhitelist(address krnlNodePubKey, bool allowed) external onlyOwner {
        whitelist[krnlNodePubKey] = allowed;
    }

    function setRuntimeDigest(bytes32 runtimeDigest, bool allowed) external onlyOwner {
        runtimeDigests[runtimeDigest] = allowed;
    }

    function setKernel(uint kernelId, bool allowed) external onlyOwner {
        kernels[kernelId] = allowed;
    }

    function registerdApp(bytes32 entryId) external view returns (bytes memory) {
        bytes memory digest = abi.encodePacked(keccak256(abi.encode(entryId)));
        return Sapphire.sign(Sapphire.SigningAlg.Secp256k1PrehashedKeccak256, accessKeypair.privKey, digest, "");
    }

    function isKernelAllowed(bytes calldata auth, uint kernelId) external view onlyAuthorized(auth) returns (bool) {
        return kernels[kernelId];
    }

    function getOpinion(bytes calldata auth, bytes calldata executionPlan, uint kernelId)
        external view onlyAuthorized(auth) returns (bool, bool, bytes memory)
    {
        (bool success, bytes memory data) = opinionMaker.staticcall(abi.encodeWithSignature("getOpinion(bytes,uint256)", executionPlan, kernelId));
        require(success, "Opinion retrieval failed");
        return abi.decode(data, (bool, bool, bytes));
    }
}
