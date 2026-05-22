import { fetchPaginatedUsers, fetchUsers } from "./services/usersService";
import { usersKeys } from "./usersKeys";

export const usersQueries = {
  all: () => ({
    queryKey: usersKeys.all,
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  }),
  paginated: (page) => ({
    queryKey: usersKeys.paginated(page),
    queryFn: () => fetchPaginatedUsers(page),
    staleTime: 1000 * 60 * 5,

    placeholderData: (prevData) => prevData
  })
}