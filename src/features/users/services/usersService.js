export const fetchUsers =  async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const savedUsers = localStorage.getItem('users')

  return savedUsers ? JSON.parse(savedUsers) : []
}

export const saveUsers = (users) => {
  localStorage.setItem('users',JSON.stringify(users))
}

export const createUser = async(newUser) => {
  await new Promise((resolve) => 
    setTimeout(resolve, 500)
  )

  const savedUsers = localStorage.getItem('users')
  const users = savedUsers 
    ? JSON.parse(savedUsers)
    : []
  const updatedUsers = [...users, newUser] 

  localStorage.setItem('users', JSON.stringify(updatedUsers))

  return newUser
}

export const followUser = async(userId) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

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

export const deleteUser = async(userId) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const savedUsers = localStorage.getItem('users')
  const users = savedUsers ? JSON.parse(savedUsers) : []  
  const updatedUsers = users.filter((user) => user.id !== userId)

  localStorage.setItem('users', JSON.stringify(updatedUsers))

  return userId
}

export const fetchPaginatedUsers = async (page = 1) => {
  await new Promise ((resolve) => 
    setTimeout(resolve, 500)
  )

  const savedUsers = localStorage.getItem('users')
  const users = savedUsers 
    ? JSON.parse(savedUsers)
    : []

    const pageSize = 3

    const start = (page - 1) * pageSize
    const end = start + pageSize

    return users.slice(start, end)
}

const listeners = []

export const subscribeToFollowerGrowth = (callback) => {
  listeners.push(callback)

  return () => {
    const idx = listeners.indexOf(callback)

    if (idx !== -1) return listeners.splice(idx, 1)
  }
}

export const randomFollowerGrowth = async () => {
  const savedUsers = localStorage.getItem('users')
  const users = savedUsers ? JSON.parse(savedUsers) : []

  if (users.length === 0) return

  const randomIdx = Math.floor(Math.random() * users.length)

  const user = users[randomIdx]
  user.followers += 1

  localStorage.setItem('users', JSON.stringify(users))

  listeners.forEach((listener) => 
    listener({
      userId: users.id
    })
  )
}