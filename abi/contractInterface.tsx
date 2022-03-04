import { Interface } from "ethers/lib/utils";

// export const contractInterface = new Interface([
//     // Read function
//     "function isOwner() view returns (bool)",

//     // Write function
//     "function createItem(string _name, string _verifier, bool _halal)",
//     "function step2(uint _itemID, string _verifier, bool _halal)",
//     "function step3(uint _itemID, string _verifier, bool _halal)",
//     "function step4(uint _itemID, string _verifier, bool _halal)",

//     // Events
//     "event Trace(uint indexed _itemID, uint _step, bool _halal, string verifiers, uint _time)"
// ])

export const contractABIInterface = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_itemID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_step",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "_halal",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "verifiers",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "Trace",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_verifier",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_halal",
				"type": "bool"
			}
		],
		"name": "createItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_itemID",
				"type": "uint256"
			}
		],
		"name": "isHalal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_halal",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "items",
		"outputs": [
			{
				"internalType": "enum Traceability.SupplyChainSteps",
				"name": "step",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "halal",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_itemID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_verifier",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_halal",
				"type": "bool"
			}
		],
		"name": "step2",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_itemID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_verifier",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_halal",
				"type": "bool"
			}
		],
		"name": "step3",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_itemID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_verifier",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_halal",
				"type": "bool"
			}
		],
		"name": "step4",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]