import { updateAllNotifications } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAllNotifications() {
  const queryClient = useQueryClient();
  const { mutate: updateNotification, status } = useMutation({
    mutationFn: ({ id, obj }) => updateAllNotifications(id, obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ queryKey: ["recieverNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["senderNotifications"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateNotification, status };
}
