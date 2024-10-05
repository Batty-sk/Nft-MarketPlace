import { Outlet } from "react-router-dom"
import { NavBar,Footer } from "./components"
import "./index.css"
const App = () => {

  return (
    <main>
      <NavBar />
        <Outlet />  
        {
        // for dyanamic routes
        }
        <Footer />
    </main>
  )
}

export default App
