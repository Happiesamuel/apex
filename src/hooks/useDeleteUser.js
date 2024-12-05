"use client";
import { deleteUser as deleteUserApi } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, status: deleteStatus } = useMutation({
    mutationFn: (id) => deleteUserApi(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { deleteUser, deleteStatus };
}
