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