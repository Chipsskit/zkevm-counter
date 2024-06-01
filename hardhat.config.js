require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/**  @type import('hardhat/config').HardhatUserConfig */

module.exports = {
    solidity:"0.8.9",
    paths: {
        artifacts: "./src",
    },
    networks: {
        zkEVM: {
            url: `https://rpc.public.zkevm-test.net`,
            accounts: [process.env.ACCOUNT_PRIVATE_KEy],
        },
    },
};