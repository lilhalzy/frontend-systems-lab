import { useState, useEffect } from "react"
import Header from "./components/Header"
import ProfileCard from "./components/ProfileCard"
import Footer from "./components/Footer"

function App() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users')

    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          {
            id: 1,
            name: 'Daan',
            role: 'Frontend Developer',
            online: true,
            followers: 0,
          },
          {
            id: 2,
            name: 'Sarah',
            role: 'UI Designer',
            online: false,
            followers: 0,
          },
          {
            id: 3,
            name: 'Adam',
            role: 'Backend Developer',
            online: false,
            followers: 0,
          },
        ]
  })
  
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

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const [newUserName, setNewUserName] = useState('')
  const [newUserRole, setNewUserRole] = useState('')
  const handleAddUser = (e) => {
    e.preventDefault()

    const trimmedName = newUserName.trim()
    const trimmedRole = newUserRole.trim()

    if(!trimmedName || !trimmedRole) {
      return
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: trimmedName,
      role: trimmedRole,
      online: false,
      followers: 0,
    }

    setUsers((prevUsers) => [...prevUsers, newUser])

    setNewUserName('')
    setNewUserRole('')
  }

  return(
    <div>
      <Header/>
      <form onSubmit={handleAddUser}>
        <input 
          type="text"
          placeholder="Enter name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Enter role"
          value={newUserRole}
          onChange={(e) => setNewUserRole(e.target.value)}
        />
        <button type="submit">Add user</button>
      </form>
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