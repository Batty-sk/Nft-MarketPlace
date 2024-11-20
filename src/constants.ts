export const RPC_URL = "http://127.0.0.1:8545";
export const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
import { ethers } from "ethers";
import { PinataSDK } from "pinata-web3";


export type filterednftsData = {
  tokenId: number;
  owner: string;
  creatorAddress: string;
  isListed: boolean;
  price: string;
  tokenData: {
    name: string;
    description: string;
    imgURI: string;
  };
};

export const fetchNftsImages = async (imageURI:string)=>{
  try{const pinata = new PinataSDK({
    pinataJwt: import.meta.env.VITE_PINATA_IPFS_JWT,
    pinataGateway: "plum-cheap-wasp-820.mypinata.cloud",
    pinataGatewayKey:
     import.meta.env.VITE_PINATA_CLOUD_SECERET,
  });
  
    const data: any = await pinata.gateways.get(
     imageURI
    );
    if (data.contentType && data?.contentType.startsWith("image/")) {
      console.log("extracting image///");

      const imageUrl = URL.createObjectURL(data.data);
      return imageUrl
    }
    return ''
  }
  catch(err){
    return ''
  }
}

export const cleanNftsData = async (nfts: any[]) => {
  console.log("directly consoling the nfts", nfts);
  const filteredData: filterednftsData[] = [];

  for (let i = 0; i < nfts.length; i++) {
   const imgData= await fetchPinataMetadata(nfts[i][5])
    const temp: filterednftsData = {
      tokenId: hexToInt(nfts[i][0]),
      owner: nfts[i][1],
      creatorAddress: nfts[i][2],
      isListed: nfts[i][3],
      price:ethers.utils.formatEther(ethers.BigNumber.from(nfts[i][4]._hex)), 
      tokenData: { name:imgData.name,description:imgData.description,imgURI:await fetchNftsImages(imgData.imgURI) },
    };
    filteredData.push(temp);
  }
  return filteredData;
};
const hexToInt = (hex: string) => {
  return parseInt(hex, 16);
};
async function fetchPinataMetadata(ipfsHash: string) {
  console.log("ipfs hash", ipfsHash);
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    const temp = await response.json();
    console.log("temp", temp);
    const metadata: { name: string; description: string; imgURI: string } =
      temp;
    console.log("Fetched metadata:", metadata);
    return metadata;
  } catch (error) {
    console.error("Error fetching metadata from Pinata:", error);
    const obj: { name: string; description: string; imgURI: string } = {
      name: "",
      description: "",
      imgURI: "",
    };
    return obj;
  }
}
