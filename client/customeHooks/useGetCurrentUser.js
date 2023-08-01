import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

export const useGetCurrentUser = () => {
  const router = useRouter();
  const result = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => await axios.get(`/api/user/me`, { withCredentials: true }),
    onError: (e) => console.log(e),
  });
  return { ...result, user: result.data?.data };
};
