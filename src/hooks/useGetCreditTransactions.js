"use client";
import { getCreditTransaction } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useGetCreditTransactions(user) {
  const { data: creditTransactions, status } = useQuery({
    queryKey: ["creditTransactions"],
    queryFn: async () => await getCreditTransaction(user.$id),
  });

  return { creditTransactions, status };
}
