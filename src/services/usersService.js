export const fetchUsers =  async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  )

  const savedUsers =
    localStorage.getItem('users')

  return savedUsers
    ? JSON.parse(savedUsers)
    : []
}

export const saveUsers = (users) => {
  localStorage.setItem(
    'users',
    JSON.stringify(users)
  )
}

export const createUser = async(user) => {
  await new Promise((resolve) => 
    setTimeout(resolve, 1000)
  )

  const shouldFail = Math.random() < 0.5

  if (shouldFail) {
    throw new Error('Failed to create user')
  }

  return user
}