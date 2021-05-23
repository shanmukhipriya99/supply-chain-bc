import Web3 from "web3"; //Web3 is a constructor function

let web3;
window.ethereum.enable();   //Very IMP!
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // in the server OR user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/800a4ebe2cdf4ca096126ab399c2f39f"
  );
  web3 = new Web3(provider);
}

export default web3;
