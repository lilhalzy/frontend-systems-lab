import Header from "./components/Header"
import ProfileCard from "./components/ProfileCard"
import Footer from "./components/Footer"

function App() {
  return(
    <div>
      <Header/>
      <main>
        <ProfileCard name="lilhalzy" role="A rotten Software Developer"/>
        <ProfileCard name="Sarah" role="Electrical Engineering"/>
      </main>
      <Footer/>
    </div>
  )
}

export default App