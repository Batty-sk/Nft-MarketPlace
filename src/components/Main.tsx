import { useRef, useState,useEffect } from "react";
import { CardProfile, Banner } from "./";
import { images } from "../assets";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Main = () => {
  const ParentRef = useRef<HTMLDivElement | null>(null);
  const ChildRef = useRef<HTMLDivElement | null>(null);
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
    <main className="h-[120vh] dark:bg-black flex flex-col items-center">
      <div className="flex justify-center pt-10  ">
        <Banner title="Dive into the NFT universe where art, technology, and ownership meet!" />
      </div>

      <div className="md:mt-12 w-3/4 relative">
        <h1 className="font-poppins dark:text-white text-black text-2xl md:ml-5 font-semibold">
          Best Sellers
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
    </main>
  );
};

export default Main;
