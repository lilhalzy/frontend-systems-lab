import { useInfiniteQuery } from "@tanstack/react-query"
// import { fetchPaginatedUsers } from "../services/usersService"

const useInfiniteUsersQuery = () => {
  return useInfiniteQuery({
    queryKey: [
      'users',
      'infinite',
    ],

    // queryFn: ({pageParam = 1}) => fetchPaginatedUsers(pageParam),
    queryFn: async () => [],
    enabled: false,
    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1
    },

    staleTime: 1000 * 60 * 5
  })
}

export default useInfiniteUsersQuery