import React from "react";
import { images } from "../assets";

const DetailsNfts = () => {
  return (
    <section className="flex justify-center">
      <div className="flex flex-col justify-center items-center md:w-3/5">
        <div className="flex p-8 bg-gray-100 mt-10 rounded-tl-3xl mb-8">
          <img
            src={images.nfts[0]}
            height={250}
            width={200}
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
                <button className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-green-700 font-poppins text-white">Buy Now</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DetailsNfts;
