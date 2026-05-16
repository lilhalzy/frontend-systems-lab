import { createContext, useContext, useEffect, useReducer } from "react"
import { usersReducer, initialState } from "../reducers/usersReducer"
import { fetchUsers, saveUsers } from "../services/usersService"
import { fetchUsersStart, fetchUsersSuccess, fetchUsersError } from "../actions/usersActions"

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
      const getUsers = async () => {
        dispatch(fetchUsersStart())
        
        try {
          const users = await fetchUsers()
          
          dispatch(fetchUsersSuccess(users))

      } catch (err) {
          dispatch(fetchUsersError(err.message))
      }
    }
    
    getUsers()
  }, [])
  
  useEffect(() => {
    saveUsers(state.users)
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