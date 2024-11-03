import React from "react";

type CardNftProps = {
  name: string;
  image: string;
  account: string;
  ethAmount: number;
};
const CardNft = ({ name, image, account, ethAmount }: CardNftProps) => {
  return (
    <div className="flex flex-col justify-center h-fit w-fit cursor-pointer hover:scale-105 hover:-translate-y-1.5 transition-all duration-500 ease-in-out flex-1 font-poppins font-semibold dark:text-white text-black py-5 px-4 m-2 rounded-md bg-slate-100 shadow-sm shadow-gray-400 dark:bg-zinc-900 dark:shadow-sm dark:shadow-pink-500">
           <div className="relative rounded-md flex justify-center">
                <img src={image} alt="NFT" height={240} width={240} style={{objectFit:'cover'}} />
           </div>
           
           <div className="card-meta flex flex-col justify-center px-1 pt-4">
                <h3 className="text-sm font-semibold">{name}</h3>
                <div className="md:mt-3">
                <p className="text-sm">{account}</p>
                <p className="">{ethAmount.toFixed(2)} ETH</p>
                </div>
           </div>   
    </div>
  );
};

export default CardNft;
