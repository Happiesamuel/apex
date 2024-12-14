"use client";
import { deleteBill as deleteBillApi } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBill() {
  const queryClient = useQueryClient();
  const { mutate: deleteBill, status: deleteStatus } = useMutation({
    mutationFn: (id) => deleteBillApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
  return { deleteBill, deleteStatus };
}
