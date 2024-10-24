import React, { createContext, ReactNode } from "react";
import { ethers } from "ethers";
import { RPC_URL,PRIVATE_KEY,CONTRACT_ADDRESS } from "../constants";
import contractAbi from '../../artifacts/contracts/NFT_marketPlace.sol/NFT_marketPlace.json'


type ContextProps = {
  handleUploadImageToIpfs: (
    image: File,
    name: string,
    description: string,
    price: number
  ) => void;
};

export const ContractContext = createContext<ContextProps>({handleUploadImageToIpfs:()=>0});

type Props = {
  children: ReactNode;
};

export const ContractContextWrapper = ({ children }: Props) => {
  console.log('pinata jwt',import.meta.env.VITE_PINATA_IPFS_JWT)


  const getProvider =()=>{
    
  }

  async function uploadImageToIPFS(file: File) {
    const url = `https://uploads.pinata.cloud/v3/files`;

    let formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_IPFS_JWT}`, 
        },
        body: formData,
      });

      const result = await response.json();
      console.log("File pinned successfully:", result);
      return result.IpfsHash;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }
  }

  async function uploadMetadataToIPFS(metadata: any) {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_IPFS_JWT}`,
        },
        body: JSON.stringify(metadata),
      });

      const result = await response.json();
      console.log("Metadata pinned successfully:", result);
      return result.IpfsHash;
    } catch (error) {
      console.error("Error uploading metadata to IPFS:", error);
    }
  }

  const handleUploadImageToIpfs = async (
    image: File,
    name: string,
    description: string,
    price: number
  ) => {
    await getMarketNFTs()
    //createNFT("ipfs://QmWsryVXAzExNhraRn3L5EWd6VHYDp7gcZ6Q1ufucbMmZ4")
    /* const imgHash = await uploadImageToIPFS(image);

    const metaData = {
      name,
      description,
      price,
      imgURI: `ipfs://${imgHash}`,
    };

    const metaHash = await uploadMetadataToIPFS(metaData);
    console.log(`Metadata hash: ipfs://${metaHash}`);
    await createNFT(metaHash) // send the request to the smartcontract regarding creation of the nft.
    console.log('nft has been created successfully!'); */
  };

  const getMarketNFTs = async ()=>{
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
    const {abi} = contractAbi;
    const nftMarketplaceContract = new ethers.Contract(CONTRACT_ADDRESS,abi,provider);
    
    try{
      const listedNFTS = await nftMarketplaceContract.getListedNFTS()
      console.log("listed nftities",listedNFTS)
    }
    catch (error){
      console.log("errror has been occured fetching the marketLISTING......");
    }
  }

  const createNFT = async (metahash: string) => {
    try {
      if (!window.ethereum || !window.ethereum.request) {
        alert("MetaMask is not installed or the provider is unavailable!");
        return;
      }
  
      await window.ethereum.request({ method: "eth_requestAccounts" });
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
  
      const signer = provider.getSigner();
      const { abi } = contractAbi;

  
      const nftMarketplaceContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  
      const tx = await nftMarketplaceContract.createNFT(10, metahash); 
      console.log(`Contract tx: ${tx.hash}`);
  
      const receipt = await tx.wait();
      console.log("Transaction mined in block:", receipt.blockNumber);
  
      return receipt;
    } catch (error) {
      console.error("Error creating an NFT:", error);
      return null;
    }
  };

  return (
    <ContractContext.Provider value={{ handleUploadImageToIpfs }}>
      {children}
    </ContractContext.Provider>
  );
};
