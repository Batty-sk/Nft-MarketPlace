import React, { createContext, ReactNode, useState } from "react";

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
    const imgHash = await uploadImageToIPFS(image);

    const metaData = {
      name,
      description,
      price,
      imgURI: `ipfs://${imgHash}`,
    };

    const metaHash = await uploadMetadataToIPFS(metaData);
    console.log(`Metadata hash: ipfs://${metaHash}`);
  };

  return (
    <ContractContext.Provider value={{ handleUploadImageToIpfs }}>
      {children}
    </ContractContext.Provider>
  );
};
