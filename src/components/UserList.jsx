import useUsers from "../hooks/useUsers"

const UserList = () => {
    const {
        users,
        loading,
        error
    } = useUsers()
    

    if (loading) {
        return <p>Loading users...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    if (users.length === 0) {
        return <p>No users found</p>
    }

    return (
        <section>
            <h2>Fetched Users</h2>
            {
                users.map((user) => (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <h3>{user.email}</h3>
                    </div>
                ))
            }
        </section>
    )
}

export default UserList