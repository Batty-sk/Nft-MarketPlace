export const RPC_URL = 'http://127.0.0.1:8545'; 
export const PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; 
export const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

type filterednftsData={
    owner:string,
    creatorAddress:string,
    isListed: boolean,
    price:number,
    tokenURI:string,
}

export const cleanNftsData = async(nfts:any[])=>{

    console.log('directly consoling the nfts',nfts)
    const filteredData:filterednftsData[]= []
    for(let i=0;i<nfts.length;i++){
        const temp={owner:nfts[i][0],
        creatorAddress:nfts[i][1],
        isListed:nfts[i][2],
        price:hexToInt(nfts[i][3]),
        tokenURI:nfts[i][4]
        }
        filteredData.push(temp)

    }
    return filteredData
}
const hexToInt = (hex:string)=>{

  return parseInt(hex, 16);
    
}