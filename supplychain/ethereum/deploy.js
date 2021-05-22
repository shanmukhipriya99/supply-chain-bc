// const HDWalletProvider = require('@truffle/hdwallet-provider');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, object: bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'test boost nuclear avoid episode inject gaze joke infant poet raven inspire',
    'https://ropsten.infura.io/v3/800a4ebe2cdf4ca096126ab399c2f39f'
); 
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from: ', accounts[0]);
    const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });
    console.log(interface);
    console.log('Contract deployed to: ', result.options.address);
};
deploy();

//contract address: 0x616e58a72DcB5FF5f4a44187941958b42BE1852D