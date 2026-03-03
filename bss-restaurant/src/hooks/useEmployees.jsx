import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useEmployees = (page = 1, perPage = 10) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["employees", page, perPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/Employee/datatable`, {
        params: { Page: page, Per_Page: perPage },
      });
      return data;
    },
    keepPreviousData: true,
  });
};
