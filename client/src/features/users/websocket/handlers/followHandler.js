export const followHandler = (queryClient, event) => {
  queryClient.setQueryData(['users', 'infinite'], (oldData) => {
    if (!oldData) return oldData

    return {
      ...oldData,
      pages: oldData.pages.map((page) => page.map((user) => 
        user.id === event.userId ? {...user, followers: user.followers + 1} : user
      )),
    }
  })
}

export default followHandler