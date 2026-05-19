import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/usersService";

const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onMutate: async (userId) => {
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (oldUsers = []) => {
        return oldUsers.filter((user) => user.id !== userId);
      });

      return { previousUsers };
    },

    onError: (err, userId, context) => {
      queryClient.setQueryData(["users"], context.previousUsers);

      console.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export default useDeleteUserMutation;
