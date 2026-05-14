import { createContext, useContext, useEffect, useReducer } from "react"

const UsersContext = createContext()

const initialState = {
  users: [],
  loading: false,
  error: null,
}

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USERS_START':
      return {
        ...state,
        loading: true,
        error: null,
      }
      
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload,
      }
      
    case 'FETCH_USERS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'ADD_USER': 
      return {
        ...state,
        users: [
          ...state.users,
          action.payload,
        ],
      }

    case 'DELETE_USER': 
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id !== action.payload
        ),
      }
      
    case 'FOLLOW_USER': 
      return {
        ...state,
        users: state.users.map(
          (user) => user.id === action.payload
          ? {
            ...user,
            followers: user.followers + 1,
          }
          : user
        ),
      }
      
      default:
        return state
  }
}
    
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