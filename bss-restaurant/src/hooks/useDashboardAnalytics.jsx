import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

function useDashboardAnalytics() {
  const axiosSecure = useAxiosSecure();

  const { data, isPending, isError } = useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Dashboard/stats");
      return data;
    },
    staleTime: 30000,
  });

  return { data, isPending, isError };
}

export default useDashboardAnalytics;
