const ethers = require('ethers');

async function deployContract() {
    // Type guard to check if MetaMask is installed
    if (typeof window === 'undefined' || !window.ethereum) {
        console.error('MetaMask is not installed!');
        return;
    }

    // Type assertion to tell TypeScript that `window.ethereum` is of type `MetaMaskEthereumProvider`
    const ethereum = window.ethereum as typeof window.ethereum & {
        request: (args: { method: string }) => Promise<any>;
    };

    try {
        // Request user accounts via MetaMask
        await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error("User denied account access:", error);
        return;
    }

    // Create a provider and signer using MetaMask
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    // Read the compiled contract's ABI and bytecode
    const contractData = await fetch('./artifacts/contracts/NFT_marketPlace.json');
    const { abi, bytecode } = await contractData.json();

    // Create a ContractFactory and deploy the contract
    const ContractFactory = new ethers.ContractFactory(abi, bytecode, signer);
    console.log("Deploying contract...");

    try {
        const contract = await ContractFactory.deploy(); // Deploy the contract
        await contract.deployed(); // Wait for the transaction to be mined
        console.log("Contract deployed at:", contract.address);
    } catch (error) {
        console.error("Deployment failed:", error);
    }
}

// Call the deploy function
deployContract();
