import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser } from "../services/usersService"

export const useAddUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    },
  })
}

export default useAddUserMutation