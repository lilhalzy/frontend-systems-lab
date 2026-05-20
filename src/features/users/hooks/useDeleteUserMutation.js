import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/usersService";
import { usersQueries } from "../usersQueries";

const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onMutate: async (userId) => {
      await queryClient.cancelQueries({
        queryKey: usersQueries.all().queryKey,
      });

      const previousUsers = queryClient.getQueryData(usersQueries.all().queryKey);

      queryClient.setQueryData(usersQueries.all().queryKey, (oldUsers = []) => {
        return oldUsers.filter((user) => user.id !== userId);
      });

      return { previousUsers };
    },

    onError: (err, userId, context) => {
      queryClient.setQueryData(usersQueries.all().queryKey, context.previousUsers);

      console.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueries.all().queryKey,
      });
    },
  });
};

export default useDeleteUserMutation;
