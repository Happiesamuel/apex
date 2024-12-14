"use client";
import { getBills } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useGetBills({ user }) {
  const { data: billsData, status } = useQuery({
    queryFn: () => getBills(user.$id),
    queryKey: ["bills"],
  });

  return { billsData, status };
}
