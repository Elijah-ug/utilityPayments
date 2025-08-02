require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 0x14a34
    },
    celoAlfajores: {
      url: process.env.CELO_ALFAJORES_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 0xaef3
    }
  }
};
