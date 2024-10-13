import { Outlet } from "react-router-dom"
import { NavBar,Footer } from "./components"
import "./index.css"
import { MetaMaskWrapper } from "./contexts/MetaMaskContext"
import { ContractContextWrapper } from "./contexts/ContractContext"
const App = () => {

  return (
    <ContractContextWrapper >
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
    </ContractContextWrapper>

  )
}

export default App
