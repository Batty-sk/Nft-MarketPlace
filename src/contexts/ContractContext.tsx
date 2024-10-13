import React, { createContext, ReactNode } from "react";
import pinataSDK from "@pinata/sdk";
import { ethers } from "ethers";

const pinata = new pinataSDK("yourPinataApiKey", "yourPinataSecretKey");

type ContextProps = {
  handleUploadImageToIpfs: (
    image: File,
    name: string,
    description: string,
    price: number
  ) => void;
};

export const ContractContext = createContext<ContextProps | null>(null);

type Props = {
  children: ReactNode;
};

export const ContractContextWrapper = ({ children }: Props) => {
  async function uploadImageToIPFS(file: File) {
    try {
      const result = await pinata.pinFileToIPFS(file);
      console.log("File pinned successfully:", result);
      return result.IpfsHash;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }
  }

  async function uploadMetadataToIPFS(metadata: any) {
    try {
      const result = await pinata.pinJSONToIPFS(metadata);
      console.log("Metadata pinned successfully:", result);
      return result.IpfsHash;
    } catch (error) {
      console.error("Error uploading metadata to IPFS:", error);
    }
  }

  async function createNFT(metaData:any){

  }

  const handleUploadImageToIpfs = async (
    image: File,
    name: string,
    description: string,
    price: number
  ) => {
    // upload the image then it will return the hash
    const imgHash = await uploadImageToIPFS(image);
    const metaData = {
      name,
      description,
      price,
      imgURI: `ipfs://${imgHash}`,
    };
    const metaHash = await uploadMetadataToIPFS(metaData);
    const isCreated = await createNFT(metaHash)
    // now we have to store the metaHash using the  smartContract's createToken function
  };

  return (
    <ContractContext.Provider value={{ handleUploadImageToIpfs }}>
      {children}
    </ContractContext.Provider>
  );
};
