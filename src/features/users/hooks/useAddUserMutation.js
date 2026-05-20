import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/usersService";
import { usersKeys } from "../usersKeys";

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,

    onMutate: async (newUser) => {
      await queryClient.cancelQueries({
        queryKey: usersKeys.all,
      });

      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(usersKeys.all, (oldUsers = []) => {
        return [...oldUsers, newUser];
      });

      return { previousUsers };
    },

    onError: (err, newUser, context) => {
      queryClient.setQueryData(usersKeys.all, context.previousUsers);

      console.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
  });
};

export default useAddUserMutation;
