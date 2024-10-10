import { LightMode, DarkMode, Menu } from "@mui/icons-material";

import Button from "./Button";
import useToggleModes from "../customHooks/useToggleModes";
import { useState } from "react";
import { useContext } from "react";
import { MetaMaskContext } from "../contexts/useMetaMaskContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MenuItems = () => {
  return (
    <>
      {[
        { item: "My-NFTs", path: "/" },
        { item: "Resell-NFTs", path: "/resell-NFT" },
        { item: "Details-NFTs", path: "/resell-NFT" },
      ].map((item, i) => (
        <Link to={item?.path} key={item?.item} className="no-underline p-2">
          {" "}
          <li className="text-sm font-semibold dark:text-white text-black">
            {item?.item}
          </li>
        </Link>
      ))}
    </>
  );
};

const NavBar = () => {
  const [mode, setMode] = useToggleModes();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate=useNavigate()
  const {isConnected,connectWallet}=useContext(MetaMaskContext)

  return (
    <nav className="dark:bg-black dark:border-b  max-h-10 dark:border-zinc-900 border-b border-gray-200  flex justify-between items-center py-8 px-4">
      <div className="dark:text-white text-black font-poppins font-semibold">
       <Link to="/"> Logo </Link>
      </div>
      <div>
        <div className="font-poppins font-semibold flex items-center ">
          <div className="relative py-2 px-2 me-3 dark:bg-gray-700 bg-blue-400 flex justify-between items-center w-[80px] max-w-24 rounded-full h-9">
            <LightMode style={{color:'yellow'}} />
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
              {isConnected?<Button title="Create" path="" handleOnClickOrChange={()=>{navigate('/create-nft')}}/>:

              <Button title="Connect" path="" handleOnClickOrChange={()=>{connectWallet(true)}}/>
            }
            </div>
          </div>

          <div className="block md:hidden" >
            <Menu onClick={()=>setIsMenuOpen(true)}/>
          </div>
        
        {isMenuOpen?<div className="fixed inset-0 flex-col items-center justify-center">
            <ul className="flex flex-col justify-center items-center">
                <MenuItems />
            </ul>
            
            <Button title="Connect" path="/connect" handleOnClickOrChange={()=>0}/>
  
        </div>:<></>}

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
