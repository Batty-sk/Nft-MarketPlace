import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CreateNFT from "../pages/CreateNFT";
import { MyNfts } from "../components";

export const Routes = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:
        [
            {path:'/',
                element:<Home/>
            },
            {
                path:'/create-nft',
                element:<CreateNFT />
            },
            {
                path:'/my-nft',
                element:<MyNfts/>
            }

        ]
    }
])