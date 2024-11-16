// deploy.js
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function deployContract() {
  try {
    // Define your private key and RPC URL
    const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Replace with your actual private key
    const RPC_URL = "http://127.0.0.1:8545"; // URL for the Hardhat local testnet

    // Create a provider and a wallet
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log("Deploying contract with account:", wallet.address);
    console.log("Account balance:", (await wallet.getBalance()).toString());
     
    // Read and parse the compiled contract's ABI and bytecode
    const contractPath = path.join(__dirname, "../artifacts/contracts/NFT_marketPlace.sol/NFT_marketPlace.json");
    const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));
    const { abi, bytecode } = contractJson;

    // Create a ContractFactory instance
    const ContractFactory = new ethers.ContractFactory(abi, bytecode, wallet);
    console.log("Deploying NFT Marketplace...");

    // Deploy the contract
    const marketplace = await ContractFactory.deploy();
    await marketplace.deployed();

    console.log("NFT Marketplace deployed to:", marketplace.address);

    // Save the deployment information
    const deploymentInfo = {
      contractAddress: marketplace.address,
      deployer: wallet.address,
      timestamp: new Date().toISOString(),
      chainId: (await provider.getNetwork()).chainId,
    };

    // Create deployment directory if it doesn't exist
    const deploymentDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentDir)) {
      fs.mkdirSync(deploymentDir);
    }

    // Save deployment info to file
    fs.writeFileSync(
      path.join(deploymentDir, "deployment-info.json"),
      JSON.stringify(deploymentInfo, null, 2)
    );

    // Verify the deployment was successful
    const deployedCode = await provider.getCode(marketplace.address);
    if (deployedCode === "0x") {
      throw new Error("Contract deployment failed - no bytecode at address");
    }

    return { marketplace, deploymentInfo };

  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

// Execute deployment
if (require.main === module) {
  deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = deployContract;
