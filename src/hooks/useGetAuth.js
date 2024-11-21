import { auth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetAuth() {
  const { data, status, error } = useQuery({
    queryKey: ["session"],
    queryFn: async () => await auth(),
  });
  console.log(data);
  return { data, status, error };
}
