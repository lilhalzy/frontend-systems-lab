import { useState, useEffect } from "react"

const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch (
                    'https://jsonplaceholder.typicode.com/users'
                )

                const data = await response.json()
    
                setUsers(data)
            }   catch (err) {
                console.error(err)
            }
        }
    
        fetchUsers()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)

                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/invalid-url'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch users')
                }

                const data = await response.json()

                setUsers(data)
            }   catch (err) {
                setError(err.message)
            }   finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

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