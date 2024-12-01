/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  EthereumUtils,
  EthereumUtilsInterface,
} from "../../../../@oasisprotocol/sapphire-contracts/contracts/EthereumUtils";

const _abi = [
  {
    inputs: [],
    name: "DER_Split_Error",
    type: "error",
  },
  {
    inputs: [],
    name: "expmod_Error",
    type: "error",
  },
  {
    inputs: [],
    name: "k256Decompress_Invalid_Length_Error",
    type: "error",
  },
  {
    inputs: [],
    name: "k256DeriveY_Invalid_Prefix_Error",
    type: "error",
  },
  {
    inputs: [],
    name: "recoverV_Error",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60808060405234601757603a9081601d823930815050f35b600080fdfe600080fdfea26469706673582212201e2e744787e4d9bbe4d6c441bede937672f0c5fb4780eee1eabd791ae1a865e664736f6c63430008180033";

type EthereumUtilsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EthereumUtilsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EthereumUtils__factory extends ContractFactory {
  constructor(...args: EthereumUtilsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      EthereumUtils & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): EthereumUtils__factory {
    return super.connect(runner) as EthereumUtils__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EthereumUtilsInterface {
    return new Interface(_abi) as EthereumUtilsInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): EthereumUtils {
    return new Contract(address, _abi, runner) as unknown as EthereumUtils;
  }
}
