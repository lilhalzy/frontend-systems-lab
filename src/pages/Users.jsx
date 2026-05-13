import ProfileCard from '../components/ProfileCard'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import useUserForm from '../hooks/useUserForm'
import { useUserContext } from '../context/UsersContext'

function Users() {
  const {users, setUsers} = useUserContext()

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

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    )
  }

  const addUser = (newUser) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      newUser,
    ])
  }

  const {
    formData,
    formError,
    handleInputChange,
    handleSubmit,
  } = useUserForm(addUser)

  return (
    <section>
      <h1>Users Page</h1>

      <form onSubmit={handleSubmit}>
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