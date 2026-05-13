import { createContext, useContext, useEffect, useState } from "react"

const UsersContext = createContext()

const UsersProvider = ({children}) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users')

    return savedUsers
    ? JSON.parse(savedUsers)
    : []
  })

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  return (
    <UsersContext.Provider value={{users, setUsers}}>{children}</UsersContext.Provider>
  )
}

const useUserContext = () => {
  return useContext(UsersContext)
}

export {
  UsersProvider,
  useUserContext,
}