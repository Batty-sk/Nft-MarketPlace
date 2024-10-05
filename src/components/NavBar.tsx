import { LightMode, DarkMode, Menu } from "@mui/icons-material";

import Button from "./Button";
import useToggleModes from "../customHooks/useToggleModes";
import { useState } from "react";

const MenuItems = () => {
  return (
    <>
      {[
        { item: "my-NFTs", path: "/" },
        { item: "resell-NFTs", path: "/resell-NFT" },
        { item: "details-NFTs", path: "/resell-NFT" },
      ].map((item, i) => (
        <a href={item?.path} key={item?.item} className="no-underline p-2">
          {" "}
          <li className="text-[12px] dark:text-white text-black">
            {item?.item}
          </li>
        </a>
      ))}
    </>
  );
};

const NavBar = () => {
  const [mode, setMode] = useToggleModes();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="dark:bg-black dark:border-b  max-h-10 dark:border-gray-500 border-b border-black  bg-white flex justify-between items-center py-8 px-4">
      <div className="dark:text-white text-black font-poppins font-semibold">
        Logo
      </div>
      <div>
        <div className="font-poppins font-semibold flex items-center ">
          <div className="relative py-2 px-2 me-3 dark:bg-gray-700 bg-blue-400 flex justify-between items-center w-[80px] max-w-24 rounded-full h-9">
            <LightMode color="warning" />
            <DarkMode />
            <div
              className={`bg-white  absolute w-[45%] h-full transition-all top-0 ${
                mode ? "left-0" : "right-0"
              } rounded-full border-2 cursor-pointer`}
              onClick={() => setMode(!mode)}
            ></div>
          </div>

          <div className="hidden md:flex items-center">
            <ul className="flex">
              <MenuItems />
            </ul>

            <div>
              <Button title="Connect" path="/connect" />
            </div>
          </div>

          <div className="block md:hidden" >
            <Menu onClick={()=>setIsMenuOpen(true)}/>
          </div>
        
        {isMenuOpen?<div className="fixed inset-0 flex-col items-center justify-center">
            <ul className="flex flex-col justify-center items-center">
                <MenuItems />
            </ul>
            
            <Button title="Connect" path="/connect" />
  
        </div>:<></>}

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
