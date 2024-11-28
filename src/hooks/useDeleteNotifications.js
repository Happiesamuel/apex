import { deleteAllNotifications } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteNotifications() {
  const queryClient = useQueryClient();
  const { mutate: deleteNotification, status } = useMutation({
    mutationFn: (id) => deleteAllNotifications(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ queryKey: ["recieverNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["senderNotifications"] });
    },
  });
  return { status, deleteNotification };
}
