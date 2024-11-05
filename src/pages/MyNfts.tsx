import React,{useState,useEffect} from 'react'
import { Banner } from '../components'
import SearchBar from '../components/SearchBar'
import { filterednftsData } from "../constants";
import { Link } from 'react-router-dom';

const MyNfts = () => {

  const [myNFTs,setMyNFTs] = useState<filterednftsData[]|null>(null)
  const [searchData,searchDataResult]= useState<filterednftsData[] |null>(null)

  useEffect(()=>{

  },[])

    return (
    <div className='flex flex-col items-center'>
        <Banner title='' />
        <div className=' relative'>
          <span className='w-36 h-36 block bg-white border rounded-full -mt-20 z-10'></span>
        </div>

        <div className='mt-10 w-2/4 '>
          <SearchBar nftsData={[]} searchDataResult={searchDataResult} styles='w-full flex  justify-center' />
        </div>
        <div className='mt-5 w-3/4'>
          {!MyNfts.length?
          <div className='flex flex-col justify-center items-center '><h1 className='font-poppins font-semibold text-3xl'>You Don't Own Any NFTs</h1>
          <Link className='underline font-poppins mt-3' to={'/#market-place-nft-area'}>Buy Now?</Link>
          </div>:null }
        </div>
    </div>
  ) 

}

export default MyNfts
