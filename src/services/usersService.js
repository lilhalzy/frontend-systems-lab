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

export const followUser = async(userId) => {
  await new Promise((resolve) => 
    setTimeout(resolve, 500)
  )

  const savedUsers = localStorage.getItem('users')
  const users = savedUsers ? JSON.parse(savedUsers) : []
  const updatedUsers = users.map(
    (user) => user.id === userId
      ? { ...user, followers: user.followers + 1 }
      : user
  )

  localStorage.setItem('users', JSON.stringify(updatedUsers))

  return updatedUsers
}