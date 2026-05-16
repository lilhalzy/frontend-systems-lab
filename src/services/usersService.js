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