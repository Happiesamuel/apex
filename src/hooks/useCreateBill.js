"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBill as createBillApi } from "@/lib/action";
export function useCreateBill() {
  const queryClient = useQueryClient();
  const { mutate: createBill } = useMutation({
    mutationFn: (obj) => createBillApi(obj),
    onSuccess: () => {
      queryClient.invalidateQueries("bills", { refetchActive: true });
    },
  });
  return { createBill };
}
