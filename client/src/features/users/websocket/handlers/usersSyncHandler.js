export const usersSyncHandler = (queryClient, event) => {
  queryClient.setQueryData(['users', 'infinite'], {
    pages: [event.users],
    pageParams: [1],
  })
}

export default usersSyncHandler