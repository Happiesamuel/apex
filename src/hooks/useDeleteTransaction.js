"use client";
import { deleteTransaction as deleteTransactionApi } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const { mutate: deleteTransaction, status: deleteStatus } = useMutation({
    mutationFn: async (id) => await deleteTransactionApi(id),
    onSettled: () => {
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ queryKey: ["debitTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["creditTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  return { deleteTransaction, deleteStatus };
}
