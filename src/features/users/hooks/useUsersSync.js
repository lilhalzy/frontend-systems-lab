// import { useEffect } from "react"
// import { useQueryClient } from "@tanstack/react-query"

// const useUsersSync = () => {
//   const queryClient = useQueryClient()

//   useEffect(() => {
//     const handleStorage = (e) => {
//       console.log('STORAGE EVENT', e)
//       if (e.key !== 'users') return
//     }
//       console.log('Users CHANGED')
    
//     queryClient.invalidateQueries({
//       queryKey: ['users', 'infinite'],
//     })

//     window.addEventListener('storage', handleStorage)
//   }, [queryClient])
// }

// export default useUsersSync

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