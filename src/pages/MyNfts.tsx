import React,{useState,useEffect} from 'react'
import { Chip } from '@mui/material';
import { Banner } from '../components'
import SearchBar from '../components/SearchBar'
import { filterednftsData } from "../constants";
import { Link } from 'react-router-dom';
import blockies from 'ethereum-blockies';
import { useContext } from 'react';
import { MetaMaskContext } from '../contexts/MetaMaskContext';

const MyNfts = () => {
  const {account} = useContext(MetaMaskContext)
  const [accountAvatar,updateAccountAvatar] = useState(account)
  const [myNFTs,setMyNFTs] = useState<filterednftsData[]|null>(null)
  const [searchData,searchDataResult]= useState<filterednftsData[] |null>(null)
                 useEffect(()=>{
                 },[])
  
 useEffect(()=>{
    updateAccountAvatar(blockies.create({seed:account, size: 20}).toDataURL())
 },[account])                
    return (
    <div className='flex flex-col items-center'>
        <Banner title='' />
        <div className='relative w-32 h-32 block bg-white  rounded-full overflow-hidden -mt-20 z-10'>
           <img src={accountAvatar} alt="" className='object-cover h-full w-full' />
        </div>
        <Chip label={account} className='mt-5'></Chip>
        <div className='mt-10 w-2/4 '>
          <SearchBar nftsData={[]} searchDataResult={searchDataResult} styles='w-full flex  justify-center' />
        </div>
        <div className='mt-5 w-3/4'>
          {!MyNfts.length?
          <div className='flex flex-col justify-center items-center '><h1 className='font-poppins font-bold text-3xl'>You Don't Own Any NFTs</h1>
          <Link className='underline font-poppins mt-3' to={'/#market-place-nft-area'}>Buy Now?</Link>
          </div>:null }
        </div>
    </div>
  ) 

}

export default MyNfts
