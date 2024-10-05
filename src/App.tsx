import { Outlet } from "react-router-dom"
import { NavBar } from "./components"
import "./index.css"
const App = () => {

  return (
    <main>
      <NavBar />
        <Outlet />  
        {
        // for dyanamic routes
        }
    </main>
  )
}

export default App
