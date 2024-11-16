import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Share } from "@mui/icons-material";
import AppsIcon from "@mui/icons-material/Apps";
import { Tooltip } from "@mui/material";

import { filterednftsData } from "../constants";
import { images, etherim } from "../assets";
import { ContractContext } from "../contexts/ContractContext";
import blockies from "ethereum-blockies";
import { CardNft } from "../components";

const DetailsNfts = () => {
  const { getOwnerNFTs, fetchToken } = useContext(ContractContext);
  const { id } = useParams();
  const [accountAvatar, updateAccountAvatar] = useState("");
  const [moreOwnerNFTs, updateMoreOwnerNFTs] = useState<filterednftsData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    if (id) {
      const [tokenId, ownerId] = id.split("_");
      updateAccountAvatar(
        blockies.create({ seed: ownerId, size: 16 }).toDataURL()
      );
      (async () => {
        const data = await getOwnerNFTs(ownerId);
        updateMoreOwnerNFTs(data);
      })();
    }
  }, [id]);

  if (!id) {
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
            <h1 className="font-poppins text-3xl font-semibold">NFT Name</h1>
            <p className="font-poppins text-sm text-zinc-700 pt-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Officiis, non ducimus. Nobis obcaecati commodi numquam officia
              vitae minima, temporibus sed praesentium iste ex nesciunt ullam
              esse magnam odio? Pariatur aperiam possimus optio quaerat
              consequatur ipsam aliquid. Rem, dolores praesentium perferendis
              deleniti eius vel harum officiis tempora tenetur adipisci tempore,
              voluptatum veniam voluptatibus necessitatibus nulla sapiente.
            </p>
            <div className="pt-3 flex justify-between pl-0 ml-0">
              <div className="font-poppins text-sm font-semibold flex items-center">
                <img
                  src={accountAvatar}
                  alt=""
                  className="object-cover h-10 w-10 rounded-full"
                />
                <span className="ms-2">{id}</span>
              </div>
              <p className="font-poppins font-semibold flex items-center">
                <Tooltip title={"Ethereum"}>
                  <img src={etherim} alt="" height={30} width={30} />
                </Tooltip>
                100 ETH
              </p>
            </div>
            <div className="mt-3 flex">
              <button
                className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-green-700 font-poppins text-white"
                onClick={() => setIsModalOpen(true)} // Open modal
              >
                <ShoppingCart className="pr-2" />
                Buy Now
              </button>
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
                Confirm Purchase
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                <span className="font-bold font-poppins">NFT Name:</span>{" "}
                Amazing NFT <br />
                <span className="font-bold font-poppins">Price:</span> 100 ETH{" "}
                <br />
                <span className="font-bold font-poppins ">
                  Platform Fee:
                </span>{" "}
                0.0025 ETH
              </p>
              <hr className="bg-gray-300 h-1" />
              <p className="text-lg font-bold text-center mb-6 font-poppins mt-3">
                Total: 100.0025 ETH
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-3 py-2 w-full rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-green-700 font-poppins text-white"
                  onClick={() => {
                    setIsModalOpen(false);
                    alert("Order Confirmed!");
                  }} // Open modal
                >
                  {" "}
                  Confirm
                </button>
                <button
                  className="px-3 ml-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-red-600 font-poppins outline text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}

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
      </div>
    </section>
  );
};

export default DetailsNfts;
