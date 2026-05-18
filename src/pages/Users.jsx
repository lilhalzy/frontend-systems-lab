import ProfileCard from '../components/ProfileCard'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import useUserForm from '../hooks/useUserForm'
import { useUsersContext } from '../context/UsersContext'
import { deleteUser } from '../actions/usersActions'
import useUsersQuery from '../hooks/useUsersQuery'
import useAddUserMutation from '../hooks/useAddUserMutation'
import useFollowUserMutation from '../hooks/useFollowUserMutation'
import useDeleteUserMutation from '../hooks/useDeleteUserMutation'

function Users() {
  const {dispatch} = useUsersContext()
  const addUserMutation = useAddUserMutation() 
  const followUserMutation = useFollowUserMutation()
  const deleteUserMutation = useDeleteUserMutation()
  
  const {
  data: users = [],
  isLoading,
  error,
  } = useUsersQuery()
  
  const handleFollow = async (id) => {
    try {
      await followUserMutation.mutateAsync(id)
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserMutation.mutateAsync(id)
    } catch (err) {
      console.error(err.message)
    }
  }

  const addUser = async (newUser) => {
    try {
      await addUserMutation.mutateAsync(newUser)
    } catch (err) {
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

        <Button 
          type="submit"
          disabled={addUserMutation.isPending}  
        >
          {addUserMutation.isPending ? 'Adding...' : 'Add User'}
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