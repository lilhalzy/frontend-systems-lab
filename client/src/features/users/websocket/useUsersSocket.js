import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { connectSocket }from '../services/socketService'
import { socketHandlers } from './socketHandlers'

const useUsersSocket = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const socket = connectSocket()
    socket.onopen = () => {
      console.log('Socket connected')
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      
      console.log('Received socket event:', message)
      
      const handler = socketHandlers[message.type]

      if (handler) {
        handler(queryClient, message)
      }
    }

    socket.onclose = () => {
      console.log('Socket disconnected')
    }

    return () => {
      socket.close()
    }
  }, [queryClient])
}

export default useUsersSocket