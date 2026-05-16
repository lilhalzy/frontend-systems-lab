export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    payload: user,
  }
}

export const deleteUser = (id) => {
  return {
    type: 'DELETE_USER',
    payload: id,
  }
}

export const followUser = (id) => {
  return {
    type: 'FOLLOW_USER',
    payload: id,
  }
}

export const fetchUsersStart = () => {
  return {
    type: 'FETCH_USERS_START',
  }
}

export const fetchUsersSuccess = (
  users
) => {
  return {
    type: 'FETCH_USERS_SUCCESS',
    payload: users,
  }
}

export const fetchUsersError = (
  error
) => {
  return {
    type: 'FETCH_USERS_ERROR',
    payload: error,
  }
}