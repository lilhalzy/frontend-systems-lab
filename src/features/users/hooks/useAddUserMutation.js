import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/usersService";

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,

    onMutate: async (newUser) => {
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (oldUsers = []) => {
        return [...oldUsers, newUser];
      });

      return { previousUsers };
    },

    onError: (err, newUser, context) => {
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

export default useAddUserMutation;
