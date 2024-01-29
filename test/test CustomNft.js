const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CustomNft", function () {
  let CustomNft;
  let customNft;

  beforeEach(async function () {
    CustomNft = await ethers.getContractFactory("CustomNft");
    customNft = await CustomNft.deploy("NFT Name", "NFT Symbol", 100, "Special benefits");
    await customNft.waitForDeployment();
  });

  it("should deploy with the correct name, symbol, price, and benefits", async function () {
    const name = await customNft.name();
    const symbol = await customNft.symbol();
    const price = await customNft.price();
    const benefits = await customNft.benefits();

    // Convert '100' to BigInt for comparison
    const expectedPrice = BigInt(100);

    // Log the type and values of 'price' and 'expectedPrice'
    console.log("Type of price:", typeof price, "Value:", price);
    console.log("Type of expectedPrice:", typeof expectedPrice, "Value:", expectedPrice);

    expect(name).to.equal("NFT Name");
    expect(symbol).to.equal("NFT Symbol");

    // Compare the BigInt values
    expect(price).to.equal(expectedPrice)
    expect(benefits).to.equal("Special benefits");
  });

  // Add more tests as needed for your contract functionality
});
