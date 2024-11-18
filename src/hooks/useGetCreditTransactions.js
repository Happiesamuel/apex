"use client";
import { getCreditTransaction } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useGetCreditTransactions(id) {
  const { data: creditTransactions, status } = useQuery({
    queryKey: ["creditTransactions"],
    queryFn: async () => await getCreditTransaction(id),
  });
  return { creditTransactions, status };
}
