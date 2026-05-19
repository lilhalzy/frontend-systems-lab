import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/usersService";

const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export default useUsersQuery;
