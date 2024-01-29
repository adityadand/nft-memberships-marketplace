

  // scripts/deploy_custom_nft.js

async function main() {
    const CustomNft = await ethers.getContractFactory("CustomNft");
    const customNft = await CustomNft.deploy("xio acity", "xact", 1000, "Special benefits");
    await customNft.waitForDeployment();
  
    console.log("CustomNft deployed to:", customNft.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  