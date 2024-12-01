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
  CustomOpinionMaker,
  CustomOpinionMakerInterface,
} from "../../contracts/CustomOpinionMaker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
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
        name: "executionPlan",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "kernelId",
        type: "uint256",
      },
    ],
    name: "getOpinion",
    outputs: [
      {
        internalType: "bool",
        name: "opinion",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isFinalized",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "updatedPlan",
        type: "bytes",
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
  "0x6080346100bb57601f61089d38819003918201601f19168301916001600160401b038311848410176100c0578084926020946040528339810103126100bb57516001600160a01b0390818116908190036100bb5780156100a257600080546001600160a01b03198116831782556040519316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a36107c690816100d78239f35b604051631e4fbdf760e01b815260006004820152602490fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe604060a0815260048036101561001457600080fd5b600091823560e01c80636e93bb3914610165578063715018a6146101085780638da5cb5b146100dc5763f2fde38b1461004c57600080fd5b346100d85760203660031901126100d8576001600160a01b038235818116939192908490036100d45761007d610671565b83156100be57505082546001600160a01b0319811683178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b51631e4fbdf760e01b8152908101849052602490fd5b8480fd5b8280fd5b838234610104578160031936011261010457905490516001600160a01b039091168152602090f35b5080fd5b8334610162578060031936011261016257610121610671565b80546001600160a01b03198116825581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b80fd5b5090346100d857816003193601126100d85780359167ffffffffffffffff6080526080518311610625573660238401121561062557828201359060805182116100d457602491840182810191368311610621578335956101c3610671565b879688966020928381870312610619578781013590608051821161061d5701866043820112156106195787810135956080518711610607578660051b9786519761020f878b018a6106cf565b8852858801916044839a850101938285116105355760448101935b85851061056657505050505050895b85518110156105545761024c8187610759565b518381511461025e5750600101610239565b60019a91939495969798999a948581146000146103fb5750858101519087828051810103126103f7578780610294898501610783565b93015191015187818051810103126103f357876102b19101610783565b90826103e8575b50816103e0575b50156103d6575082975b86516000198101929083116103c557505081146103bb575b6102ed60609186610759565b510152959192955b8151938285019082808701525180915260609384860191858160051b8801019991925b81841061035c575050505090829161033e8561035897989903601f1981018752866106cf565b81519788971515885215159087015285015283019061064c565b0390f35b909192998480600192605f198b82030185528651908a806103a36103916080865186528787015190808988015286019061064c565b8d80870151908683039087015261064c565b9301511515910152950192019a019299919091610318565b90965086906102e1565b634e487b7160e01b8c52601190528afd5b97985082986102c9565b9050386102bf565b6064109150386102b8565b8d80fd5b8c80fd5b91999160021461040c575b506102c9565b85819a929a01518051810187810191888183031261053557888101519060805182116105505701918291608093849103126105355789519361044d8561069d565b828a01516001600160a01b039390848116810361054a5786526104718c8201610783565b948b870195865260609182810151608051811161054257810185603f8201121561054257808f918f0151966104a5886106f1565b926104b2815194856106cf565b8884528883010111610539578f968f91886104d09385019101610629565b858901520151908601520151888180518101031261053557886104f39101610783565b915115159283610528575b505081610520575b5015610516575082975b38610406565b9798508298610510565b905038610506565b51161515915038806104fe565b8e80fd5b50505050508f80fd5b505050508f80fd5b50508f80fd5b8f80fd5b505050909193509591959493946102f5565b84356080518111610602578201906080828503601f190112610602578a519161058e8361069d565b60448101358352606481013560805181116105fb578660446105b29284010161070d565b8b84015260848101359060805182116105fb576105d687604460a49484010161070d565b8d850152013590811515820361054a57828b939260608594015281520194019361022a565b5050508f80fd5b508f80fd5b634e487b7160e01b8c5260418352888cfd5b8a80fd5b8b80fd5b8680fd5b8380fd5b60005b83811061063c5750506000910152565b818101518382015260200161062c565b9060209161066581518092818552858086019101610629565b601f01601f1916010190565b6000546001600160a01b0316330361068557565b60405163118cdaa760e01b8152336004820152602490fd5b6080810190811067ffffffffffffffff8211176106b957604052565b634e487b7160e01b600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff8211176106b957604052565b67ffffffffffffffff81116106b957601f01601f191660200190565b81601f8201121561075457803590610724826106f1565b9261073260405194856106cf565b8284526020838301011161075457816000926020809301838601378301015290565b600080fd5b805182101561076d5760209160051b010190565b634e487b7160e01b600052603260045260246000fd5b519081151582036107545756fea264697066735822122089b12d507768abad8ff772c9dd4d356704ec2963f4034cb2467e2ee4b2dc675a64736f6c63430008180033";

type CustomOpinionMakerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CustomOpinionMakerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CustomOpinionMaker__factory extends ContractFactory {
  constructor(...args: CustomOpinionMakerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    initialOwner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(initialOwner, overrides || {});
  }
  override deploy(
    initialOwner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(initialOwner, overrides || {}) as Promise<
      CustomOpinionMaker & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CustomOpinionMaker__factory {
    return super.connect(runner) as CustomOpinionMaker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CustomOpinionMakerInterface {
    return new Interface(_abi) as CustomOpinionMakerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): CustomOpinionMaker {
    return new Contract(address, _abi, runner) as unknown as CustomOpinionMaker;
  }
}
