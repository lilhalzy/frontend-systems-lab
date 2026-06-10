import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '../services/usersService'

const useDeleteUserMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: deleteUser,

      onMutate: async (userId) => {
        await queryClient.cancelQueries({
          queryKey: ['users', 'infinite'],
        })

        const previousUsers =
          queryClient.getQueryData(['users', 'infinite'])

        queryClient.setQueryData(['users', 'infinite'], (oldData) => {
            if (!oldData) return oldData

            return {
              ...oldData,

              pages: oldData.pages.map((page) => page.filter((user) => user.id !== userId ))
            }
          }
        )

        return { previousUsers}
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

export default useDeleteUserMutation