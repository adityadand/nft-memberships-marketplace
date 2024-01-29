const { ethers } = require("hardhat");

async function main() {
  // Get values from command line arguments or prompt the user
  const title = process.argv[2] || 'DefaultTitle'; // You might want to add validation
  const symbol = process.argv[3] || 'DefaultSymbol';
  const priceUsd = parseInt(process.argv[4]) || 0; // Assuming it's a number
  const benefits = process.argv.slice(5).join(' ') || 'DefaultBenefits';

  console.log(title);
  console.log(symbol);
  console.log(priceUsd);
  console.log(benefits);

  // Check if required parameters are provided
  if (!title || !symbol || isNaN(priceUsd) || !benefits) {
    console.error("Please provide all required parameters: title, symbol, priceUsd, benefits");
    process.exit(1);
  }

  const CustomNft = await ethers.getContractFactory("CustomNft");
  const customNft = await CustomNft.deploy(title, symbol, BigInt(priceUsd), benefits);
  await customNft.waitForDeployment();

  console.log("CustomNft deployed to:", customNft.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
