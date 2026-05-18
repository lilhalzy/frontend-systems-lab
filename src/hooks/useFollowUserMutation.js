import {useMutation,useQueryClient} from '@tanstack/react-query'
import { followUser } from '../services/usersService'

const useFollowUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: followUser,

    onMutate: async (userId) => {
      await queryClient.cancelQueries({
        queryKey: ['users'],
      })

      const previousUsers =
        queryClient.getQueryData([
          'users',
        ])

      queryClient.setQueryData(
        ['users'],
        (oldUsers = []) => {
          return oldUsers.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  followers:
                    user.followers + 1,
                }
              : user
          )
        }
      )

      return { previousUsers }
    },

    onError: (err, userId, context) => {
      queryClient.setQueryData(
        ['users'],
        context.previousUsers
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })
}

export default useFollowUserMutation