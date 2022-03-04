import { Interface } from "ethers/lib/utils";

export const contractInterface = new Interface([
    // Read function
    "function isOwner()",

    // Write function
    "function createItem(string _name, string _verifier, bool _halal)",
    "function step2(uint _itemID, string _verifier, bool _halal)",
    "function step3(uint _itemID, string _verifier, bool _halal)",
    "function step4(uint _itemID, string _verifier, bool _halal)",

    // Events
    "event Trace(uint _itemID, uint _step, bool _halal, string verifiers, uint _time)"
])