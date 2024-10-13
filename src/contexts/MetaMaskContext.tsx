import React, { createContext, ReactNode, useState } from "react";

interface MetaMaskContextType {
  isConnected: boolean;
  connectWallet: (arg:boolean) => void;
}

export const MetaMaskContext = createContext<MetaMaskContextType >({isConnected:false,connectWallet:()=>{}});

type Props = {
  children: ReactNode;
};

export const MetaMaskWrapper: React.FC<Props> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = () => {
    setIsConnected(true);
    console.log("Wallet connected");
  };

  return (
    <MetaMaskContext.Provider value={{ isConnected, connectWallet }}>
      {children}
    </MetaMaskContext.Provider>
  );
};
