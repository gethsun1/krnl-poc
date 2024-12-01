/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  KrnlRegistered,
  KrnlRegisteredInterface,
} from "../../contracts/KrnlRegistered";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAuthorityPublicKey",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedTransaction",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "executed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAuthorityPublicKey",
        type: "address",
      },
    ],
    name: "setTokenAuthorityPublicKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAuthorityPublicKey",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080346100c657601f61041238819003918201601f19168301916001600160401b038311848410176100cb578084926020946040528339810103126100c657516001600160a01b0390818116908190036100c65733156100ad5760005460018060a01b0319903382821617600055604051933391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3600154161760015561033090816100e28239f35b604051631e4fbdf760e01b815260006004820152602490fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe608060408181526004908136101561001657600080fd5b600092833560e01c9081634ba1cfe4146102a957508063715018a61461024c5780638da5cb5b14610224578063909dd26314610143578063d213d86b146100f65763f2fde38b1461006657600080fd5b346100f25760203660031901126100f2576001600160a01b038235818116939192908490036100ee576100976102ce565b83156100d857505082546001600160a01b0319811683178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b51631e4fbdf760e01b8152908101849052602490fd5b8480fd5b8280fd5b50503461013f57602036600319011261013f57356001600160a01b0381169081900361013f576101246102ce565b6bffffffffffffffffffffffff60a01b600154161760015580f35b5080fd5b5082903461013f57602092836003193601126100f25767ffffffffffffffff81358181116100ee57366023820112156100ee57808301359180831161021157845193601f8401601f19908116603f01168501918211858310176101fe5750845281835236602483830101116100ee5781859260248893018386013783010152838251918051945b8581106101ed5750508160ff939481016002815203019020541690519015158152f35b8181018301518482015282016101ca565b634e487b7160e01b875260419052602486fd5b634e487b7160e01b865260418452602486fd5b83823461013f578160031936011261013f57905490516001600160a01b039091168152602090f35b83346102a657806003193601126102a6576102656102ce565b80546001600160a01b03198116825581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b80fd5b84903461013f578160031936011261013f576001546001600160a01b03168152602090f35b6000546001600160a01b031633036102e257565b60405163118cdaa760e01b8152336004820152602490fdfea2646970667358221220370002567a85af97326a2d4d3ad65dba05b671b97bf3db83971fd626af7ffca364736f6c63430008180033";

type KrnlRegisteredConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KrnlRegisteredConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KrnlRegistered__factory extends ContractFactory {
  constructor(...args: KrnlRegisteredConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _tokenAuthorityPublicKey: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _tokenAuthorityPublicKey,
      overrides || {}
    );
  }
  override deploy(
    _tokenAuthorityPublicKey: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_tokenAuthorityPublicKey, overrides || {}) as Promise<
      KrnlRegistered & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): KrnlRegistered__factory {
    return super.connect(runner) as KrnlRegistered__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KrnlRegisteredInterface {
    return new Interface(_abi) as KrnlRegisteredInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): KrnlRegistered {
    return new Contract(address, _abi, runner) as unknown as KrnlRegistered;
  }
}
