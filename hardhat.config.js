require("@nomicfoundation/hardhat-toolbox");


task("accounts", "Prints all accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const address = await account.getAddress();

    // Check if the provider supports the "getBalance" function
    if (account.provider && account.provider.getBalance) {
      const balance = await account.provider.getBalance(address);
      console.log(address + " : " + balance.toString());
    } else {
      console.error("Provider does not support getBalance function");
    }
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks: {
    localhost :{
      url: "localhost:8545/",
      chainId : 31337,

    }
  },
  solidity: "0.8.20",
};
