import { deleteAllNotifications } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteNotifications() {
  const queryClient = useQueryClient();
  const { mutate: deleteNotification, status } = useMutation({
    mutationFn: async (id) => await deleteAllNotifications(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ queryKey: ["recieverNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["senderNotifications"] });
    },
  });
  return { status, deleteNotification };
}
