import React, { createContext, ReactNode } from "react";
import { ethers } from "ethers";
import {
  RPC_URL,
  PRIVATE_KEY,
  CONTRACT_ADDRESS,
  cleanNftsData,
} from "../constants";
import contractAbi from "../../artifacts/contracts/NFT_marketPlace.sol/NFT_marketPlace.json";
import { filterednftsData } from "../constants";
import { Error } from "@mui/icons-material";

type ContextProps = {
  handleUploadImageToIpfs: (
    image: File,
    name: string,
    description: string,
    price: number
  ) => Promise<boolean>;
  getMarketNFTs: () => Promise<filterednftsData[]>;
  getMyNFTs: () => Promise<filterednftsData[]>;
  getOwnerNFTs: (arg: string) => Promise<filterednftsData[]>;
  fetchToken: (arg: number) => Promise<[]>;
  getMyListedNFTS: () => Promise<filterednftsData[]>;
  buyNFT: (arg: number, amount: string) => Promise<boolean>;
  removeNftFromMarket: (arg: number) => Promise<boolean>;
  resellNFT: (arg: number, newPrice: number) => Promise<boolean>;
};

export const ContractContext = createContext<ContextProps>({
  handleUploadImageToIpfs: async () => false,
  getMarketNFTs: async () => [],
  getMyNFTs: async () => [],
  getMyListedNFTS: async () => [],
  getOwnerNFTs: async () => [],
  fetchToken: async () => [],
  buyNFT: async () => true,
  removeNftFromMarket: async () => true,
  resellNFT: async () => true,
});

type Props = {
  children: ReactNode;
};

export const ContractContextWrapper = ({ children }: Props) => {
  console.log("pinata jwt", import.meta.env.VITE_PINATA_IPFS_JWT);

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
      console.log("image uploaded successfully", result.data.cid);
      return result.data.cid;
    } catch (error: any) {
      console.error("Error uploading file to IPFS:", error);
      throw new Error(error);
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
      throw new Error("error occureed in Pinning metadata to ipfs server !");
    }
  }

  const handleUploadImageToIpfs = async (
    image: File,
    name: string,
    description: string,
    price: number
  ) => {
    try {
      const imgHash = await uploadImageToIPFS(image);
      console.log("image hash", imgHash);
      const metaData = {
        name,
        description,
        imgURI: imgHash, // this has to handled by the smart contract.
      };
      const metaHash = await uploadMetadataToIPFS(metaData);
      console.log(`Metadata hash: ipfs://${metaHash}`);
      await createNFT(price, metaHash); // send the request to the smartcontract regarding creation of the nft.
      console.log("nft has been created successfully!");
      return true;
    } catch (error) {
      console.log("Something went wrong", error);
      return false;
    }
  };

  const getMarketNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const { abi } = contractAbi;
    const nftMarketplaceContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      provider
    );

    try {
      const listedNFTS = await nftMarketplaceContract.getListedNFTS();

      const data = await cleanNftsData(listedNFTS);

      console.log("listed nftities", listedNFTS);
      console.log("cleaned data!", data);
      return data;
    } catch (error) {
      console.log("errror has been occured fetching the marketLISTING......");
      return [];
    }
  };

  const getMyNFTs = async () => {
    if (!window.ethereum || !window.ethereum.request) {
      alert("MetaMask is not installed or the provider is unavailable!");
      console.log("mynfts getting error");
      return [];
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const { abi } = contractAbi;

    const nftMarketplaceContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
    );

    try {
      const myNfts = await nftMarketplaceContract.getMyNFTS();
      const data = await cleanNftsData(myNfts);
      console.log("my listed nftities", myNfts);
      console.log("cleaned data!", data);
      return data;
    } catch (error) {
      console.log("errror has been occured fetching the mynfts......", error);
      return [];
    }
  };
  const getMyListedNFTS = async () => {
    if (!window.ethereum || !window.ethereum.request) {
      alert("MetaMask is not installed or the provider is unavailable!");
      console.log("mynfts getting error");
      return [];
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const { abi } = contractAbi;

    const nftMarketplaceContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
    );

    try {
      const myNfts = await nftMarketplaceContract.getMyListedNFTS();
      const data = await cleanNftsData(myNfts);
      console.log("my listed nftities", myNfts);
      console.log("cleaned data!", data);
      return data;
    } catch (error) {
      console.log("errror has been occured fetching the mynfts......", error);
      return [];
    }
  };
  const removeNftFromMarket = async (tokenId: number) => {
    if (!window.ethereum || !window.ethereum.request) {
      alert("MetaMask is not installed or the provider is unavailable!");
      console.log("removing nfts getting error");
      return false;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const { abi } = contractAbi;

    const nftMarketplaceContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
    );
    try {
      const tx = await nftMarketplaceContract.removeNftFromMarketPlace(tokenId);
      const receipt = await tx.wait();
      console.log("Transaction mined in block:", receipt.blockNumber);
      console.log("removed succesffullly!", tx);
      return true;
    } catch (error) {
      console.log("errror has been occured while removing the nfts", error);
      return false;
    }
  };
  const getOwnerNFTs = async (onwerId: string) => {
    const { abi } = contractAbi;

    if (!window.ethereum || !window.ethereum.request) {
      console.error("MetaMask is not installed or unavailable.");
      return [];
    }

    // Connect to MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the current account
    const signer = provider.getSigner();
    const currentAccount = await signer.getAddress();
    console.log("Using current account:", currentAccount);

    const nftMarketplaceContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
    );

    try {
      const ownerNFTS = await nftMarketplaceContract.getOwnerNFTS(onwerId);
      const data = await cleanNftsData(ownerNFTS);
      console.log("Onwer listed nftities", ownerNFTS);
      console.log("cleaned data!", data);
      return data;
    } catch (error) {
      console.log(
        "errror has been occured fetching the ownerNfts......",
        error
      );
      return [];
    }
  };

  const fetchProfilePic = async (address: string) => {
    try {
      const { abi } = contractAbi;
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

      const nftMarketplaceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi,
        provider
      );
      const data = await nftMarketplaceContract.fetchOwnerProfilePic(address);
      return data;
    } catch (error: any) {
      console.log("error while fetching the profile pic");
      return -1;
    }
  };

  const openMetaMask = async () => {
    if (!window.ethereum || !window.ethereum.request) {
      alert("MetaMask is not installed or the provider is unavailable!");
      return -1;
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length === 0) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedAccount = await signer.getAddress();

    console.log("Signer address:", connectedAccount);
    const { abi } = contractAbi;

    return { abi, signer };
  };
  const fetchToken = async (tokenId: number) => {
    const { abi } = contractAbi;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const nftMarketplaceContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      provider
    );
    const tokenData = await nftMarketplaceContract.fetchToken(tokenId);
    console.log("tokenData");
    return tokenData;
  };

  const buyNFT = async (tokenId: number, amount: string) => {
    const data = await openMetaMask();
    if (data == -1) return false;

    try {
      const nftMarketplaceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        data.abi,
        data.signer
      );
      console.log("buying nfts...with token id", tokenId);
      const weivalue = ethers.BigNumber.from(amount);
      const priceInWei = ethers.utils.parseEther(weivalue.toString());
      console.log("price in wei", priceInWei);
      const tx = await nftMarketplaceContract.buyNFT(tokenId, {
        value: priceInWei,
      });
      console.log(`Contract tx: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log("Transaction mined in block:", receipt.blockNumber);
      return true;
    } catch (error) {
      console.log("error while buying the nft", error);
      return false;
    }
  };

  const resellNFT = async (tokenId: number, newPrice: number) => {
    const data = await openMetaMask();
    if (data == -1) return false;

    try {
      const nftMarketplaceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        data.abi,
        data.signer
      );
      console.log("reselling nft...with token id", tokenId);
      const priceInWei = ethers.utils.parseEther(newPrice.toString());

      const tx = await nftMarketplaceContract.resellNFT(tokenId, priceInWei);
      console.log(`Contract tx: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log("Transaction mined in block:", receipt.blockNumber);
      return true;
    } catch (error) {
      console.log("error while reselling the nft", error);
      return false;
    }
  };
  const createNFT = async (price: number, metahash: string) => {
    try {
      const data = await openMetaMask();
      if (data == -1)
        throw new Error("Error occured while signing the transaction");

      const nftMarketplaceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        data.abi,
        data.signer
      );

      const tx = await nftMarketplaceContract.createNFT(price, metahash);
      console.log(`Contract tx: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log("Transaction mined in block:", receipt.blockNumber);

      return receipt;
    } catch (error) {
      console.error("Error creating an NFT:", error);
      return null;
    }

    // here we have to update the state so that fetching happens by the home page using use effect.
  };

  return (
    <ContractContext.Provider
      value={{
        handleUploadImageToIpfs,
        getMarketNFTs,
        getMyNFTs,
        getOwnerNFTs,
        fetchToken,
        buyNFT,
        getMyListedNFTS,
        removeNftFromMarket,
        resellNFT,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
