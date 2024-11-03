import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { images } from "../assets";
import { ShoppingCart } from "@mui/icons-material";
import AppsIcon from '@mui/icons-material/Apps';

const DetailsNfts = () => {
  const nftId= useParams()  // this will also returns the from which page its been called from 
  // eg - if nft clicked from market then show the more nfts from market nfts, if listed nfts then show the 
  // listed nfts , if bought nfts then show the other bought nfts in More NFTs section.
  // or 
  // just get the more nft items from the same owner...
  useEffect(()=>{
    
      //fetch the nftId

    return()=>{

    }
  })
  return (
    <section className="flex justify-center">
      <div className="flex flex-col justify-center items-center md:w-4/5">
        <div className="flex p-8 bg-gray-100 shadow-sm shadow-gray-400  mt-10 rounded-tl-3xl mb-8">
          <img
            src={images.nfts[0]}
            height={250}
            width={280}
            alt="nft"
            style={{ objectFit: "cover" }}
            className="rounded-tl-3xl"
          />

          <div className="flex flex-col pl-10">
            <h1 className="font-poppins text-3xl font-semibold">NFT name</h1>
            <p className="font-poppins text-sm text-zinc-700 pt-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate voluptates iure numquam dicta eaque perferendis ut
              recusandae deleniti vero assumenda beatae autem consequatur
              debitis vel possimus similique ipsa laborum, quo sunt. Similique
              culpa earum tempore.  
            </p>
            <div className="pt-3 flex justify-between">
            <p className="font-poppins text-sm font-semibold">
            0xC...0.6016869897472688            </p>
            <p className="font-poppins font-semibold">
                100 ETH
            </p>
            </div>
            <div className="mt-3">
                <button className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-green-700 font-poppins text-white"><ShoppingCart className="pr-2"/>Buy Now</button>
            </div>
          </div>


        </div> 
        <div className="flex flex-col">
            <h1 className="text-3xl font-semibold flex items-center font-poppins "><AppsIcon className="pr-3" fontSize="large"/>More From This Owner</h1>
        </div>
      </div>
    </section>
  );
};

export default DetailsNfts;
