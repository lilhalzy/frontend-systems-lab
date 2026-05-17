export const initialState = {
  users: [],
  loading: false,
  error: null,
}

export const usersReducer = (state, action) => {
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

    case 'ROLLBACK_USERS': 
      return {
        ...state,
        users: action.payload,
      }
      
      default:
        return state
  }
}