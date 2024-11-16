export const RPC_URL = 'http://127.0.0.1:8545'; 
export const PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; 
export const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export type filterednftsData={
  tokenId:number,
    owner:string,
    creatorAddress:string,
    isListed: boolean,
    price:number,
    tokenData:{
        name:string,
        description:string,
        imgURI:string
    },
}

export const cleanNftsData = async(nfts:any[])=>{

    console.log('directly consoling the nfts',nfts)
    const filteredData:filterednftsData[]= []
    for(let i=0;i<nfts.length;i++){
        const temp:filterednftsData={
        tokenId:nfts[i][0],
        owner:nfts[i][1],
        creatorAddress:nfts[i][2],
        isListed:nfts[i][3],
        price:hexToInt(nfts[i][4]),
        tokenData:{...await fetchPinataMetadata(nfts[i][5])}
        }
        filteredData.push(temp)

    }
    return filteredData
}
const hexToInt = (hex:string)=>{

  return parseInt(hex, 16);
    
}
async function fetchPinataMetadata(ipfsHash:string) {
    console.log('ipfs hash',ipfsHash)
    try {
      const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.statusText}`);
      }
       const temp= await response.json();
      console.log("temp",temp)
      const metadata:{name:string, description:string,imgURI:string} = temp
      console.log("Fetched metadata:", metadata);
      return metadata;
    } catch (error) {
      console.error("Error fetching metadata from Pinata:", error);
      const obj:{name:string, description:string,imgURI:string}={name:'',description:'',imgURI:''};
      return obj;

    }
  }