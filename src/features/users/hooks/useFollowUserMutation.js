import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../services/usersService";
import { usersQueries } from "../usersQueries";

const useFollowUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followUser,

    onMutate: async (userId) => {
      await queryClient.cancelQueries({
        queryKey: usersQueries.all().queryKey,
      });

      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(usersQueries.all().queryKey, (oldUsers = []) => {
        return oldUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                followers: user.followers + 1,
              }
            : user,
        );
      });

      return { previousUsers };
    },

    onError: (err, userId, context) => {
      queryClient.setQueryData(usersQueries.all().queryKey, context.previousUsers);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueries.all().queryKey,
      });
    },
  });
};

export default useFollowUserMutation;
