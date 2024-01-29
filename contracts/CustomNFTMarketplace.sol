// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomNFTMarketplace is ERC721, Ownable {
    ICustomERC20 public cusd;

    uint256 private nextTokenId = 1;

    mapping(uint256 => bool) public nftExists;
    mapping(uint256 => bool) public nftForSale;

    event NFTListedForSale(uint256 indexed tokenId);
    event NFTPurchased(uint256 indexed tokenId, address buyer);

    constructor(address _cusd, address initialOwner) ERC721("CustomNFT", "CNFT") Ownable(initialOwner) {
        cusd = ICustomERC20(_cusd);

        // Mint some initial CUSD to the contract owner for testing
        cusd.mint(initialOwner, 1000000000000000000); // Mint 1 CUSD (adjust the amount as needed)
    }

    function mint() external onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        nftExists[tokenId] = true;
        nextTokenId++;
    }

    function listForSale(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of the NFT");
        require(nftExists[tokenId], "NFT does not exist");
        require(!nftForSale[tokenId], "NFT is already listed for sale");

        nftForSale[tokenId] = true;

        emit NFTListedForSale(tokenId);
    }

    function purchaseNFT(uint256 tokenId) external {
        require(nftForSale[tokenId], "NFT is not listed for sale");
        require(nftExists[tokenId], "NFT does not exist");

        address seller = ownerOf(tokenId);
        uint256 price = 1; // Assume each NFT costs 1 CUSD (you can adjust this)

        // Transfer NFT to buyer
        _transfer(seller, msg.sender, tokenId);

        // Transfer CUSD from buyer to seller
        cusd.transferFrom(msg.sender, seller, price);

        // Reset state variables
        nftForSale[tokenId] = false;

        emit NFTPurchased(tokenId, msg.sender);
    }
}

interface ICustomERC20 {
    function mint(address to, uint256 amount) external;
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}
