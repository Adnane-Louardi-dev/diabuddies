import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCurrentUser = () => {
  const result = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => await axios.get(`/api/user/me`, { withCredentials: true }),
    onError: (e) => console.error("cannot get current user", e),
  });
  return { ...result, user: result.data?.data };
};
