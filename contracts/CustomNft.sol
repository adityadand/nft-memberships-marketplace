// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract CustomNft is ERC721 {
    uint256 public price;
    string public benefits;

    constructor(string memory name, string memory symbol, uint256 _price, string memory _benefits) ERC721(name, symbol) {
        price = _price;
        benefits = _benefits;
        console.log("name", name);
        console.log("symbol", symbol);
        console.log("price", price);
        console.log("benefits", benefits);
        console.log("msg.sender", msg.sender);


    }
}
