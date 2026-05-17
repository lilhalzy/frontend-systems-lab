export const addUser = (user) => ({
  type: 'ADD_USER',
  payload: user,
})

export const deleteUser = (id) => ({
  type: 'DELETE_USER',
  payload: id,
})

export const followUser = (id) => ({
  type: 'FOLLOW_USER',
  payload: id,
})

export const fetchUsersStart = () => ({
  type: 'FETCH_USERS_START',
})

export const fetchUsersSuccess = (users) => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: users,
})

export const fetchUsersError = (error) => ({
  type: 'FETCH_USERS_ERROR',
  payload: error,
})

export const confirmUser = (userId) => ({
  type: 'CONFIRM_USER',
  payload: userId,
})

export const removeUser = (userId) => ({
  type: 'REMOVE_USER',
  payload: userId,
})