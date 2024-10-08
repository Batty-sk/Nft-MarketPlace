const { ethers } = require("ethers");
require("dotenv").config(); // For loading private key and RPC URL from .env file
const fs = require("fs");

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;

async function main() {
  // Set up a provider (connection to Ethereum network)
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  // Set up a wallet (signer) using your private key
  const wallet = new ethers.Wallet(privateKey, provider);

  // ABI and Bytecode from Remix (or from your compiled contract)
  const abi = JSON.parse(fs.readFileSync("abi.json", "utf8"));  // Read and parse ABI
  const bytecode = fs.readFileSync("bytecode.json", "utf8");
  
  // Create a ContractFactory to deploy the contract
  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

  // Deploy the contract
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();

  // Wait for the contract to be mined
  await contract.deployed();
  
  // Output the address of the newly deployed contract
  console.log("Contract deployed at address:", contract.address);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying the contract:", error);
    process.exit(1);
  });
