import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/usersService";
import { usersKeys } from "../usersKeys";

const useUsersQuery = () => {
  return useQuery({
    queryKey: usersKeys.all,
    queryFn: fetchUsers,
  });
};

export default useUsersQuery;
