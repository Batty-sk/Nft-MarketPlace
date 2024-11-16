import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Share } from "@mui/icons-material";
import AppsIcon from "@mui/icons-material/Apps";
import { Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ArrowBackIosTwoTone } from "@mui/icons-material";
import { ResetTv } from "@mui/icons-material";

import { filterednftsData } from "../constants";
import { images, etherim } from "../assets";
import { ContractContext } from "../contexts/ContractContext";
import blockies from "ethereum-blockies";
import { CardNft } from "../components";
import { MetaMaskContext } from "../contexts/MetaMaskContext";

const DetailsNfts = () => {
  const { getOwnerNFTs, fetchToken, buyNFT, removeNftFromMarket,resellNFT } =
    useContext(ContractContext);
  const { id } = useParams();
  const { account } = useContext(MetaMaskContext);
  const [accountAvatar, updateAccountAvatar] = useState("");
  const [moreOwnerNFTs, updateMoreOwnerNFTs] = useState<filterednftsData[]>([]);
  const [currentNFT, updateCurrentNFT] = useState<filterednftsData>();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [manualRender, setManualRender] = useState<boolean>(false);
  const [newPrice,updateNewPrice] = useState(0)
  console.log("account", account, "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097");

  useEffect(() => {
    if (id) {
      const [tokenId, ownerId] = id.split("_");
      updateAccountAvatar(
        blockies.create({ seed: ownerId, size: 16 }).toDataURL()
      );
      (async () => {
        const data = await getOwnerNFTs(ownerId);
        updateCurrentNFT(data.find((item) => item.tokenId == +tokenId));
        console.log("getting the data as ", data);
        updateMoreOwnerNFTs(data);
      })();
    }
  }, [id, manualRender]);

  const handleConfirmPurchase = async () => {
    setIsModalOpen(false);
    if (currentNFT) {
      const res = await buyNFT(currentNFT?.tokenId,(currentNFT.price+0.0025).toString());
      if (res) setManualRender(!manualRender);
      else
        alert(
          "something went wrong! Please make sure you have sufficient balance and have the correct credentials"
        );
    }

    // get the details ..
  };

  const handleResellNft = async () => {
    if(currentNFT){
      const res =await resellNFT(currentNFT?.tokenId,newPrice)
      console.log('successfully re-listed on the market with new value',res)
      setManualRender(!manualRender)
    }
    
  };
  const handleRemoveToken = async () => {
    console.log("removing the tokem from the marketplace..");
    if (currentNFT) {
      const res = await removeNftFromMarket(currentNFT?.tokenId);
      res
        ? setManualRender(!manualRender)
        : console.log("Something went Wrong!");
    }
  };

  if (!currentNFT) {
    return (
      <div className="flex justify-center items-center mt-10 mb-10">
        <h1 className="font-poppins">
          Couldn't Find The NFT You're Looking For.
        </h1>
      </div>
    );
  }

  return (
    <section className="flex justify-center">
      <div className="flex flex-col justify-center items-center md:w-4/5">
        <div className="flex p-8 bg-gray-100 shadow-sm shadow-gray-400 mt-10 rounded-tl-3xl mb-8">
          <img
            src={images.nfts[0]}
            height={250}
            width={270}
            alt="nft"
            style={{ objectFit: "cover" }}
            className="rounded-tl-3xl"
          />

          <div className="flex flex-col pl-10">
            <h1 className="font-poppins text-3xl font-semibold">
              {currentNFT.tokenData.name}
            </h1>
            <p className="font-poppins text-sm text-zinc-700 pt-5 leading-7">
              {currentNFT.tokenData.description}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Officiis, non ducimus.
            </p>
            <div className="pt-3 flex justify-between pl-0 ml-0">
              <div className="font-poppins text-sm font-semibold flex items-center">
                <img
                  src={accountAvatar}
                  alt=""
                  className="object-cover h-10 w-10 rounded-full"
                />
                <span className="ms-2">{currentNFT.owner}</span>
              </div>
              <p className="font-poppins font-semibold flex items-center">
                <Tooltip title={"Ethereum"}>
                  <img src={etherim} alt="" height={30} width={30} />
                </Tooltip>
                {currentNFT.price}
              </p>
            </div>
            <div className="mt-10 flex">
              {id?.split("_")[1] == account && !currentNFT.isListed ? (
                <button
                  className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-yellow-400 font-poppins text-black"
                  onClick={()=>setIsModalOpen(true)} // Open modal
                >
                  <ResetTv className="pr-2" fontSize="medium" />
                  Resell 
                </button>
              ) : id?.split("_")[1] == account ? (
                <button
                  className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-red-600 font-poppins text-white"
                  onClick={handleRemoveToken} // Open modal
                >
                  <Close className="pr-2" />
                  Remove From Market
                </button>
              ) : (
                <button
                  className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-green-700 font-poppins text-white"
                  onClick={() => setIsModalOpen(true)} // Open modal
                >
                  <ShoppingCart className="pr-2" />
                  Buy Now
                </button>
              )}
              <button className="px-3 ml-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-gray-500 font-poppins outline text-white">
                <Share className="pr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-5/12">
              <h2 className="text-2xl font-semibold text-center mb-4 font-poppins">
                {currentNFT.isListed?"Confirm Purchase":"Resell NFT"}
              </h2>
              <p className="text-sm text-gray-700 mb-4">
    
                {currentNFT.isListed?
                <>
                            <span className="font-bold font-poppins">NFT Name:</span>{" "}
                {currentNFT.tokenData.name} <br />
                <span className="font-bold font-poppins">Price:</span>{" "}
                {currentNFT.price} ETH<br />
                <span className="font-bold font-poppins ">
                  Platform Fee:
                </span>{" "}
                0.0025 ETH</>:<span ><label htmlFor="new-price" className="font-poppins font-bold">New Price</label>
                  <input type="number" name="" id="" onChange={(x)=>updateNewPrice(+x.target.value)} className="ms-3 p-2 mt-4  outline-dashed "/>
                  </span>}
              </p>
              <hr className="bg-gray-300 h-1" />
              <p className="text-lg font-bold text-center mb-6 font-poppins mt-3">
                {currentNFT.isListed?
                `New Price: ${currentNFT.price + 0.0025} ETH`:`New Price: ${newPrice} ETH`}
              </p>
              <div className="flex justify-center gap-4">
                {currentNFT.isListed?
                <button
                  className="px-3 py-2 w-full rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500  font-poppins text-white"
                  onClick={handleConfirmPurchase} // Open modal
                >
                  {" "}
                  Confirm
                </button>:<button
                  className="px-3 py-2 w-full rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 font-poppins text-white"
                  onClick={handleResellNft} // Open modal
                >
                  {" "}
                  Confirm
                </button>}
                <button
                  className="px-3 ml-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500  font-poppins outline text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <Close />
                </button>
              </div>
            </div>
          </div>
        )}
        {id?.split("_")[1] == account ? (
          <div className="flex justify-center items-center p-5 mt-5 mb-5">
            <span className="cursor-pointer font-poppins">
              <ArrowBackIosTwoTone fontSize="large" />
              Go Back
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold flex items-center font-poppins ">
              <AppsIcon className="pr-3" fontSize="large" />
              More From This Owner
            </h1>
            <div className="flex flex-wrap gap-3 justify-center">
              {moreOwnerNFTs.map((item) => (
                <CardNft
                  tokenId={item.tokenId}
                  name={item.tokenData.name}
                  key={item.owner}
                  account={item.owner}
                  ethAmount={item.price}
                  image={item.tokenData.imgURI}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailsNfts;
