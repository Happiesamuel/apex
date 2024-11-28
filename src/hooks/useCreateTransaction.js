"use client";

import { createTransactions } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const { mutate: createTransaction, status } = useMutation({
    mutationFn: (obj) => createTransactions(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ queryKey: ["creditTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["debitTransactions"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createTransaction, status };
}
