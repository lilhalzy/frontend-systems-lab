import Header from "./components/Header"
import ProfileCard from "./components/ProfileCard"
import Footer from "./components/Footer"

function App() {
  const users = [
    {
      id: 1,
      name: 'lilhalzy',
      role: 'Frontend Developer'
    },
    {
      id: 2,
      name: 'Sarah',
      role: 'UI Designer'
    },
    {
      id: 3,
      name: 'Adam',
      role: 'Backend Developer'
    },
  ]

  return(
    <div>
      <Header/>
      {
        users.map((user) => (
          <ProfileCard 
            key={user.id} 
            name={user.name}
            role={user.role}
          />
        ))
      }
      
      <Footer/>
    </div>
  )
}

export default App