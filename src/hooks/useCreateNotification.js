import { createNotification as createNotificationApi } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function useCreateNotification() {
  const queryClient = useQueryClient();
  const { mutate: createNotification, status } = useMutation({
    mutationFn: async (obj) => await createNotificationApi(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ queryKey: ["recieverNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["senderNotifications"] });
    },
  });
  return { createNotification, status };
}
