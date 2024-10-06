import { useRef, useState,useEffect } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Search from "@mui/icons-material/Search";
import Masonry from 'react-masonry-css'


import { CardProfile, Banner,CardNft } from "../components";
import { images } from "../assets";

const Home = () => {
  const ParentRef = useRef<HTMLDivElement | null>(null);
  const ChildRef = useRef<HTMLDivElement | null>(null);
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };
  
  const [shouldNavigationVisible,setShouldNavigationVisible]=useState<boolean>(true)

useEffect(()=>{
    const handleResize = ()=>{
        if (ParentRef && ChildRef)   // one fix here.
        {
 /*            if(  ChildRef.current?.scrollWidth < ParentRef.current?.offsetWidth)
                    setShouldNavigationVisible(false) */
        }
    }
    window.addEventListener('resize',handleResize)
    return()=>{
        window.removeEventListener('resize',handleResize)
    }
},[])
  const handleCarouselMove = (move: string) => {
    switch (move) {
      case "left":
        if (ChildRef?.current) {
          ChildRef.current.scrollLeft -= 200;
        }
        break;
      case "right":
        if (ChildRef?.current) {
          ChildRef.current.scrollLeft += 200;
        }
        break;
      default:
        return 0;
    }
  };

  return (
    <main className="p-10 dark:bg-black flex flex-col items-center">
      <div className="flex justify-center  ">
        <Banner title="Dive into the NFT universe where art, technology, and ownership meet!" />
      </div>

      <div className="md:mt-12 w-3/4 relative">
        <h1 className="font-poppins dark:text-white text-black text-2xl md:ml-5 font-semibold">
          Top Sellers
        </h1>
        <div className="carosel-parent relative w-full " ref={ParentRef}>
          <div
            className="carosel-child flex justify-evenly overflow-x-scroll"
            style={{ scrollbarWidth: "none",scrollBehavior:'smooth'}}
            ref={ChildRef}
          >
            {images.avatars.map((item, i) => (
              <CardProfile
                key={i}
                image={item}
                accountHash={`0xC...${Math.random()}`}
                ethAmount={50.0 * i}
              />
            ))}
          </div>
            {shouldNavigationVisible?<>  <div
            onClick={() => handleCarouselMove("left")}
            className="absolute flex justify-center items-center top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 rounded-full dark:bg-white bg-slate-50 border cursor-pointer hover:bg-orange-200"
          >
            <ArrowLeftIcon fontSize="large" />
          </div>

          <div
            onClick={() => handleCarouselMove("right")}
            className="absolute flex justify-center items-center top-1/2 transform -translate-y-1/2 right-0 w-10 h-10 rounded-full dark:bg-white bg-slate-50 border cursor-pointer hover:bg-orange-200"
          >
            <ArrowRightIcon fontSize="large" />
          </div></>:null}
        
        </div>
      </div>

      <div className="md:mt-12 w-3/4">
              
          <div className="flex items-center justify-between font-poppins font-semibold">
                <h1 className="text-2xl dark:text-white text-black md:ml-5">Best Bids</h1>
                <div className="w-72 max-w-80 min-w-52 flex items-center justify-center">
                  <Search fontSize="large" className="cursor-pointer"/>
                  <input type="search" name="search" id="" placeholder="Search..." className="h-10 max-h-10 border-2 rounded-md dark:bg-slate-200   w-full ms-2" />
                </div>
          </div>

          <div className="mt-2 flex justify-center">
          <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {
              images.nfts.map((item,i)=>(
                <CardNft key={i} name={`User${i}`} image={item} account={`0xC...${Math.random()}`}
                ethAmount={100.0 * i}/>
              ))}
          </Masonry>

          </div>
      </div>
    </main>
  );
};

export default Home;
