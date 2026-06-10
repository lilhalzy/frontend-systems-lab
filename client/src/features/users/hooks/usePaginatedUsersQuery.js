import { useQuery } from "@tanstack/react-query";
import { usersQueries } from "../usersQueries";

const usePaginatedUsersQuery = (page) => {
  return useQuery(
    usersQueries.paginated(page),
  )
}

export default usePaginatedUsersQuery