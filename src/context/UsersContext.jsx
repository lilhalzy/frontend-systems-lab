import { createContext, useContext, useEffect, useReducer } from "react"
import { usersReducer, initialState } from "../reducers/usersReducer"

const UsersContext = createContext()

    const UsersProvider = ({children}) => {
      const [state, dispatch] = useReducer(
        usersReducer,
        initialState,
        () => {
          const savedUsers = localStorage.getItem('users')
        
          return {
            users: savedUsers
              ? JSON.parse(savedUsers)
              : [],
            loading: false,
            error: null,
          }
        }
      )
    
    useEffect(() => {
      const fetchUsers = async () => {
        dispatch({
          type: 'FETCH_USERS_START',
        })
        
        try {
          await new Promise((resolve) => 
            setTimeout(resolve, 1000)
        )
        
        const savedUsers = localStorage.getItem('users')
        
        const users = savedUsers
        ? JSON.parse(savedUsers)
        : []
        
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          payload: users,
        })  
      } catch (err) {
        dispatch({
          type: 'FETCH_USERS_ERROR',
          payload: err.message,
        })
      }
    }
    
    fetchUsers()
  }, [])
  
  useEffect(() => {
    localStorage.setItem(
      'users',
      JSON.stringify(state.users)
    )
  }, [state.users])
  
  return (
    <UsersContext.Provider value={{state, dispatch}}>{children}</UsersContext.Provider>
  )
}

const useUsersContext = () => {
  return useContext(UsersContext)
}

export {
  UsersProvider,
  useUsersContext,
}