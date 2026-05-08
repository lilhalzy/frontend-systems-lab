import { useEffect, useState } from "react"

const useUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)

                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/users'
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

    return {
        users,
        loading,
        error,
    }
}

export default useUsers