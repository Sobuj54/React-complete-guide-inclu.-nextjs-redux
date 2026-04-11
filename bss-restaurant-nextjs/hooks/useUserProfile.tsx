import clientApi from "@/lib/axios/axios-client";
import { useQuery } from "@tanstack/react-query";

export default async function useUserProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await clientApi.get("/Auth/profile");
      return data;
    },
  });
}
