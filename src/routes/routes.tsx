import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Main } from "../components";

export const Routes = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:
        [
            {path:'/',
                element:<Main/>
            }
        ]
    }
])