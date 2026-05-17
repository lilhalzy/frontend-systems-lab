import ProfileCard from '../components/ProfileCard'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import useUserForm from '../hooks/useUserForm'
import { useUsersContext } from '../context/UsersContext'
import { createUser } from '../services/usersService'
import { followUser, deleteUser, removeUser, confirmUser,addUser as addUserAction } from '../actions/usersActions'
import useUsersQuery from '../hooks/useUsersQuery'

function Users() {
  const {dispatch} = useUsersContext()
  
const {
  data: users = [],
  isLoading,
  error,
} = useUsersQuery()
  
  const handleFollow = (id) => {
    dispatch(followUser(id))
  }

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
  }

  const addUser = async (newUser) => {
    dispatch(addUserAction(newUser))

    try {
      await createUser(newUser)
      dispatch(confirmUser(newUser.id))

    } catch (err) { 
      dispatch(removeUser(newUser.id))
      console.error(err.message)
    }
  }

  const {
    formData,
    formError,
    handleInputChange,
    handleSubmit,
  } = useUserForm(addUser)
  
  if (isLoading) {
    return <p>Loading...</p>
  }
  
  if (error) {
    return <p>{error}</p>
  }

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