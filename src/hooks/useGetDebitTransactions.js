"use client";
import { getDebitTransaction } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useGetDebitTransactions(id) {
  const { data: debitTransactions, status } = useQuery({
    queryKey: ["debitTransactions"],
    queryFn: async () => await getDebitTransaction(id),
  });
  return { debitTransactions, status };
}
