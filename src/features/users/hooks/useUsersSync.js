import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const useUsersSync = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key !== 'user-events') return

      const event = JSON.parse(e.newValue)

      queryClient.setQueriesData(['users', 'infinite'], (oldData) => {
        if (!oldData) return oldData

        switch (event.type) {
          case 'FOLLOW':
            return {
            ...oldData,

            pages: oldData.pages.map((page) => page.map((user) => 
              user.id === event.userId ? {
                ...user,
                followers: user.followers + 1,
              }
              : user
            )),
          }

          case 'DELETE':
            return {
            ...oldData,

            pages: oldData.pages.map((page) => page.filter((user) => 
              user.id !== event.userId
            )),
          }
          
          case 'ADD':
            return {
            ...oldData,

            pages: oldData.pages.map((page, idx) => 
              idx === 0
              ? [event.user, ...page]
              : page
            ),
          }

          default:
            return oldData
        }
      })
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [queryClient])
}

export default useUsersSync

// [ BUG | 1:43PM ] - when opened two tabs, the added user appears at the top initially and after a refresh it will be appears at the bottom, later, it's vice-versa. appears at the bottom and then appears at the top, but when in a single tab, adding new user will always appear at the bottom