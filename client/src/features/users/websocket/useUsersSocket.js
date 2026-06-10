import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { connectSocket, sendEvent }from '../services/socketService'

const useUsersSocket = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const socket = connectSocket()
    socket.onopen = () => {
      console.log('Socket connected')

      sendEvent({
        type: 'FOLLOW_REQUEST',
        userId: 1,
      })
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      switch (message.type) {
        case 'FOLLOW':
          queryClient.setQueryData(['users', 'infinite'], (oldData) => {
            if(!oldData) return oldData

            return {
              ...oldData,
              pages: oldData.pages.map((page) => page.map((user) => 
                user.id === message.userId ? {...user, followers: user.followers + 1} : user
              )),
            }
          })
          break

          default:
            break
      }
    }

    return () => {
      socket.close()
    }
  }, [queryClient])
}

export default useUsersSocket