"use client";
import { getDebitTransaction } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useGetDebitTransactions(user) {
  const { data: debitTransactions, status } = useQuery({
    queryKey: ["debitTransactions"],
    queryFn: async () => await getDebitTransaction(user.$id),
  });

  return { debitTransactions, status };
}
