pragma solidity ^0.8.19;


contract FormationManager {
// Store owner and mapping of registered formation hashes
address public owner;
mapping(bytes32 => address) public registeredBy;


event FormationRegistered(bytes32 indexed formationHash, address indexed who);


constructor() {
owner = msg.sender;
}


// register a formation hash (off-chain computed). If already registered, revert.
function registerFormation(bytes32 formationHash) external {
require(formationHash != bytes32(0), "Zero hash not allowed");
require(registeredBy[formationHash] == address(0), "Already registered");
registeredBy[formationHash] = msg.sender;
emit FormationRegistered(formationHash, msg.sender);
}


// helper to read registration
function isRegistered(bytes32 formationHash) external view returns (bool) {
return registeredBy[formationHash] != address(0);
}
}
