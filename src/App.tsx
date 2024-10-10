import { Outlet } from "react-router-dom"
import { NavBar,Footer } from "./components"
import "./index.css"
import { MetaMaskWrapper } from "./contexts/useMetaMaskContext"
const App = () => {

  return (
    <MetaMaskWrapper >
    <main>
      <NavBar />
        <Outlet />    
        {
        // for dyanamic routes
        }
        <Footer />
    </main>
    </MetaMaskWrapper >

  )
}

export default App
