import { useQuery } from "@tanstack/react-query"
import { usersQueries } from "../usersQueries"

const useUsersQuery = () => {
  return useQuery(
    usersQueries.all(),
  )
}

export default useUsersQuery