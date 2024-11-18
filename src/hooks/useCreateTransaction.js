"use client";

import { createTransactions } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const { mutate: createTransaction, status } = useMutation({
    mutationFn: (obj) => createTransactions(obj),
    onSuccess: () => {
      queryClient.invalidateQueries("creditTransactions");
      queryClient.invalidateQueries("debitTransactions");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createTransaction, status };
}
