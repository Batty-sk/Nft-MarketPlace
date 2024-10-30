import React, { useState } from 'react'
import { useEffect } from 'react'
import { ContractContext } from '../contexts/ContractContext'
import { useContext } from 'react'
import CardNft from '../components/CardNft'
import { filterednftsData } from "../constants";


const MyNfts = () => {
    const {getMyNFTs} = useContext(ContractContext)
    const [myNFTs,setMyNFTs]=useState<filterednftsData[]|null>(null)
    useEffect(()=>{
        async function fetchMyNfts(){
         try{
          const data =  await getMyNFTs()
          setMyNFTs(data)
         }
         catch(e){
            console.log("some errror while fetching the mY nfts");
         }
        }
        fetchMyNfts()
    },[])
  return (
    <div className='flex flex-wrap justify-center'>
        {myNFTs?.map((item,i)=>(
          <div key={i} className='max-h-fit max-w-fit'>
                <CardNft  name={item.owner} image={item.tokenData.imgURI} account={`0xC...${Math.random()}`}
                            ethAmount={item.price}/>
</div>
        ))}
    </div>
  )
}

export default MyNfts
