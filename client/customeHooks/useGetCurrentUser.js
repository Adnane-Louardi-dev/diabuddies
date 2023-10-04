import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCurrentUser = () => {
  const result = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => await axios.get(`/api/user/me`, { withCredentials: true }),
    onError: (e) => console.log(e),
    refetchOnMount: false,
    cacheTime: "Infinity",
  });
  return { ...result, user: result.data?.data };
};
export const useGetCurrentUserDetailed = () => {
  const result = useQuery({
    queryKey: ["detail-user"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/diabeticDetails`, { withCredentials: true });
      console.log(data);
      return data;
    },
    onError: (e) => console.log(e),
    refetchOnMount: false,
    cacheTime: "Infinity",
  });
  return { ...result, user: result.data };
};
