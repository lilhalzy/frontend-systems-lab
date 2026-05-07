import { useState } from "react"
import Header from "./components/Header"
import ProfileCard from "./components/ProfileCard"
import Footer from "./components/Footer"

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'lilhalzy',
      role: 'Frontend Developer',
      online: true,
      followers: 0,
    },
    {
      id: 2,
      name: 'Sarah',
      role: 'UI Designer',
      online: true,
      followers: 0,
    },
    {
      id: 3,
      name: 'Adam',
      role: 'Backend Developer',
      online: false,
      followers: 0,
    },
  ])

  const handleFollow = (id) => {
    setUsers((prevUsers) => 
    prevUsers.map((user) =>
      user.id === id
        ? {
          ...user,
          followers: user.followers + 1,
        }
        : user
      )
    )
  }

  return(
    <div>
      <Header/>
      {
        users.map((user) => (
          <ProfileCard 
            key={user.id} 
            name={user.name}
            role={user.role}
            online={user.online}
            followers={user.followers}
            onFollow={() => handleFollow(user.id)}
          />
        ))
      }

      <Footer/>
    </div>
  )
}

export default App