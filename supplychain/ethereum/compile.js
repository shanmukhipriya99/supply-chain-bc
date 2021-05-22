const path = require('path'); //build a path, cross-platform compatibility
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'supplychain.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// console.log(solc.compile(source, 1));
var input = {
    language: 'Solidity',
    sources: {
        'supplychain.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
// JSON.parse(solc.compile(JSON.stringify(input)));
const { abi: interface, evm: { bytecode: { object } } } = JSON.parse(solc.compile(JSON.stringify(input))).contracts['supplychain.sol'].SupplyChain;  
// console.log(object);
module.exports = { interface, object }; // object is the actual name of the bytecode
