import ProfileCard from '../components/ProfileCard'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import useUserForm from '../hooks/useUserForm'
import { useUserContext } from '../context/UsersContext'

function Users() {
  const {users, dispatch} = useUserContext()
  
  const handleFollow = (id) => {
    dispatch({
      type: 'FOLLOW_USER',
      payload: id,
    })
  }

  const handleDeleteUser = (id) => {
    dispatch({
      type: 'DELETE_USER',
      payload: id,
    })
  }

  const addUser = (newUser) => {
    dispatch({
      type: 'ADD_USER',
      payload: newUser,
    })
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