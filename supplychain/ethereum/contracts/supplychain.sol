// SPDX-License-Identifier: SupplyChain
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract SupplyChain {
    struct Asset{
        string id;
        string name;
        string creator;
        string owner;
    }
    Asset[] public assets;

    function createAsset(string memory id, string memory name, string memory creator, string memory owner) public {
        Asset memory newAsset = Asset({
            id: id,
            name: name,
            creator: creator,
            owner: owner
        });
        
        assets.push(newAsset);
    }
    
    function transferAsset(string memory id, string memory owner) public returns(string memory, string memory, string memory, string memory){
        string memory _id;
        string memory _name;
        string memory _creator;
        string memory _owner;
        for(uint i=0; i<assets.length; i++) {
            if(keccak256(abi.encodePacked(assets[i].id)) == keccak256(abi.encodePacked(id))) {
                assets[i].owner = owner;
                _id = assets[i].id;
                _name = assets[i].name;
                _creator = assets[i].creator;
                _owner = assets[i].owner;
            }
        }
        return(_id, _name, _creator, _owner);

    }
    
}