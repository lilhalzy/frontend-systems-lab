import { Routes, Route, Link } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Users from "./pages/Users"
import About from "./pages/About"

function App() {
  return(
    <div>
      <Header/>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      
      <Footer/>
    </div>
  )
}

export default App