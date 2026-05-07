import Header from "./components/Header"
import ProfileCard from "./components/ProfileCard"
import Footer from "./components/Footer"

function App() {
  return(
    <main>
      <Header/>
      <ProfileCard name="lilhalzy" role="A rotten Software Developer"/>
      <ProfileCard name="Sarah" role="Electrical Engineering"/>
      <Footer/>
    </main>
  )
}

export default App