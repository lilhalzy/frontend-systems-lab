import { createContext, useContext, useEffect, useReducer } from "react"

const UsersContext = createContext()

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER': 
      return [
          ...state,
          action.payload,
        ]
        
    case 'DELETE_USER':
      return state.filter((user) => user.id === action.payload)
        
    case 'FOLLOW_USER':
      return state.map((user) => 
          user.id === action.payload
        ? {
            ...user,
            followers:
              user.followers + 1,
            }
          : user
        )
        
    default:
      return state
  }
}
  
  const UsersProvider = ({children}) => {
    const [users, dispatch] = useReducer(
      usersReducer,
      [],
      ()  => {
          const savedUsers = localStorage.getItem('users')
      
          return savedUsers
          ? JSON.parse(savedUsers)
          : []
        }
      )
    
    useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  return (
    <UsersContext.Provider value={{users, dispatch}}>{children}</UsersContext.Provider>
  )
}

const useUserContext = () => {
  return useContext(UsersContext)
}

export {
  UsersProvider,
  useUserContext,
}