import { useEffect, useState } from 'react'

import ProfileCard from '../components/ProfileCard'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function Users() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users')

    return savedUsers
      ? JSON.parse(savedUsers)
      : []
  })

  const [formData, setFormData] = useState({
    name: '',
    role: '',
  })

  const [formError, setFormError] = useState('')

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

    const trimmedName = formData.name.trim()
    const trimmedRole = formData.role.trim()

    if (!trimmedName || !trimmedRole) {
      setFormError('Name and role are required.')
      return 
    }

    if (trimmedName.length < 3) {
      setFormError('Name must be at least 3 characters.')
      return
    }

    if (trimmedRole.length < 3) {
      setFormError('Role must be at least 3 characters.')
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

    setFormError('')
    
    setFormData({
      name: '',
      role: '',
    })
  }

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    )
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <section>
      <h1>Users Page</h1>

      <form onSubmit={handleAddUser}>
        <Input
          name='name'
          placeholder='Enter name'
          value={formData.name}
          onChange={handleInputChange}
        />

        <Input
          name='role'
          placeholder='Enter role'
          value={formData.role}
          onChange={handleInputChange}
        />

        <Button type="submit">
          Add User
        </Button>
      </form>

      {
        formError && (
          <p>{formError}</p>
        )
      }
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