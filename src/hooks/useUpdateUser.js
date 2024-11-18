import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "@/lib/action";
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, status } = useMutation({
    mutationFn: ({ id, obj }) => updateUserApi(id, obj),
    onSuccess: () => {
      // queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, status };
}
