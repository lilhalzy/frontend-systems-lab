import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const useUsersSync = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key !== 'users') return

      queryClient.invalidateQueries({
        queryKey: ['users', 'infinite'],
      })
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [queryClient])
}

export default useUsersSync