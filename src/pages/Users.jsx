import { useEffect, useState } from 'react'

import ProfileCard from '../components/ProfileCard'

function Users() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users')

    return savedUsers
      ? JSON.parse(savedUsers)
      : []
  })

  const [newUserName, setNewUserName] = useState('')
  const [newUserRole, setNewUserRole] = useState('')

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

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

  const handleAddUser = (event) => {
    event.preventDefault()

    const trimmedName = newUserName.trim()
    const trimmedRole = newUserRole.trim()

    if (!trimmedName || !trimmedRole) {
      return
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      name: trimmedName,
      role: trimmedRole,
      online: false,
      followers: 0,
    }
    
    setUsers((prevUsers) => [
      ...prevUsers,
      newUser,
    ])
    
    setNewUserName('')
    setNewUserRole('')
  }

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    )
  }

  return (
    <section>
      <h1>Users Page</h1>

      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Enter name"
          value={newUserName}
          onChange={(e) =>
            setNewUserName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Enter role"
          value={newUserRole}
          onChange={(e) =>
            setNewUserRole(e.target.value)
          }
        />

        <button type="submit">
          Add User
        </button>
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
            onDelete={() => handleDeleteUser(user.id)}
          />
        ))
      }
    </section>
  )
}

export default Users