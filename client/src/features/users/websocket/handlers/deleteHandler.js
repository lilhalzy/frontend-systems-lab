export const deleteHandler = (queryClient, event) => {
  queryClient.setQueryData(['users', 'infinite'], (oldData) => {
    if (!oldData) return oldData

    return {
      ...oldData,
      pages: oldData.pages.map((page) => page.filter((user) => user.id !== event.userId)),
    }
  })
}

export default deleteHandler