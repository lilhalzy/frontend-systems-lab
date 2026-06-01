import { useMutation, useQueryClient} from '@tanstack/react-query'

import { followUser } from '../services/usersService'

const useFollowUserMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: followUser,

      onMutate: async (userId) => {
        await queryClient.cancelQueries({
          queryKey: ['users', 'infinite'],
        })

        const previousUsers = queryClient.getQueryData(['users','infinite',])

        queryClient.setQueryData(['users', 'infinite'], (oldData) => {
            if (!oldData) return oldData

            return {
              ...oldData,

              pages: oldData.pages.map((page) => page.map((user) =>
                        user.id === userId ? { ...user, followers: user.followers + 1} : user
                    )
                ),
            }
          }
        )

        return { previousUsers }
      },

      onError: ( err, userId, context ) => {
        queryClient.setQueryData(['users', 'infinite'], context.previousUsers)
        
        console.error(err.message)
      },

      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['users','infinite'],
        })
      },
    })
  }

export default useFollowUserMutation