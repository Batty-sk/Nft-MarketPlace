import React, { createContext, ReactNode } from "react";


type ContextProps = {
    handleUploadImageToIpfs: (image: string, name: string, description: string, price: number) => void;
}

export const ContractContext = createContext<ContextProps | null>(null);

type Props = {
    children: ReactNode;
};

export const ContractContextWrapper = ({ children }: Props) => {

    const handleUploadImageToIpfs = (image: string, name: string, description: string, price: number) => {
        // upload the image then it will return the id
    };

    return (
        <ContractContext.Provider value={{ handleUploadImageToIpfs }}>
            {children}
        </ContractContext.Provider>
    );
};
