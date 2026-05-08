import { useState, useEffect } from "react"

const UserList = () => {
    const [users, setUsers] = useState([])

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