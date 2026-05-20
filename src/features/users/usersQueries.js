import { fetchUsers } from "./services/usersService";
import { usersKeys } from "./usersKeys";

export const usersQueries = {
  all: () => ({
    queryKey: usersKeys.all,
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  }),
}