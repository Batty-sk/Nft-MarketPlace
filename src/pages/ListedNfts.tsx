import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import { filterednftsData } from "../constants";
import { ContractContext } from "../contexts/ContractContext";
import { Banner } from "../components";
import { Pagination, CardNft } from "../components";
import { BounceLoader } from "react-spinners";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { MetaMaskContext } from "../contexts/MetaMaskContext";

const ListedNfts = () => {
  const { getMyListedNFTS } = useContext(ContractContext);
  const {account} = useContext(MetaMaskContext)
  const { animateCreateButton } = useContext(ThemeContext);
  const [loading, updateLoading] = useState();
  const [myNFTs, setMyNFTs] = useState<filterednftsData[] | null>(null);
  useEffect(() => {
    async function fetchMyNfts() {
      try {
        const data = await getMyListedNFTS();
        setMyNFTs(data);
      } catch (e) {
        console.log("some errror while fetching the mY nfts");
      }
    }
    fetchMyNfts();
  }, [account]);

  const handleShowButtonToUser = () => {
    animateCreateButton(true);
    setTimeout(() => {
      animateCreateButton(false);
    }, 3000);
  };
  return (
    <div className="flex flex-wrap justify-center">
      <Banner title="Listed NFTs" />
      <div className="h-[70vh] w-full flex flex-col justify-center items-center">
        {loading ? (
          <>
            <BounceLoader color="#C11A60" />
            <span className="font-poppins mt-5">Loading...</span>
          </>
        ) : null}
        {!loading && !myNFTs?.length && (
          <>
            {" "}
            <h3 className="font-poppins text-3xl font-bold">
              You've Not Created Any NFTs Yet.
            </h3>
            <Link to={'/create-nft'}
              className="font-poppins mt-5 underline cursor-pointer"
            >
              create one?
            </Link>{" "}
          </>
        )}
      </div>
      {myNFTs?.map((item, i) => (
        <div key={i} className="max-h-fit max-w-fit">
          <CardNft
            tokenId={item.tokenId}
            name={item.owner}
            image={item.tokenData.imgURI}
            account={account}
            ethAmount={+item.price}
          />
        </div>
      ))}
      <Pagination />
    </div>
  );
};

export default ListedNfts;
