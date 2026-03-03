import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useEmployee = (id) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/Employee/get/${id}`);
      return data;
    },
    enabled: !!id,
    retry: 1,
  });
};
