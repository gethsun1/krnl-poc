// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract CustomOpinionMaker is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    struct Execution {
        uint kernelId;
        bytes result;
        bytes proof;
        bool isValidated;
    }

    struct KernelResult {
        address addr;
        bool flag;
        string name;
        uint score;
    }

    // Function to get an opinion based on execution plans
    function getOpinion(bytes calldata executionPlan, uint kernelId)
        external
        view
        onlyOwner
        returns (bool opinion, bool isFinalized, bytes memory updatedPlan)
    {
        (opinion, isFinalized, updatedPlan) = _validateExecution(executionPlan, kernelId);
    }

    // Internal validation logic
    function _validateExecution(bytes calldata executionPlan, uint kernelId)
        private
        pure
        returns (bool opinion, bool isFinalized, bytes memory updatedPlan)
    {
        Execution[] memory executions = abi.decode(executionPlan, (Execution[]));

        for (uint i = 0; i < executions.length; i++) {
            Execution memory execution = executions[i];
            if (execution.kernelId == kernelId) {
                if (kernelId == 1) {
                    // Custom Criteria for Kernel 1
                    (bool success, uint value) = abi.decode(execution.result, (bool, uint));
                    (bool proofValid) = abi.decode(execution.proof, (bool));
                    if (success && value > 100 && proofValid) {
                        opinion = true;
                    } else {
                        isFinalized = true;
                    }
                } else if (kernelId == 2) {
                    // Custom Criteria for Kernel 2
                    (KernelResult memory res) = abi.decode(execution.result, (KernelResult));
                    (bool proofValid) = abi.decode(execution.proof, (bool));
                    if (res.flag && res.addr != address(0) && proofValid) {
                        opinion = true;
                    } else {
                        isFinalized = true;
                    }
                }

                if (i == executions.length - 1) {
                    isFinalized = true;
                }

                executions[i].isValidated = true;
                break;
            }
        }

        updatedPlan = abi.encode(executions);
    }
}
