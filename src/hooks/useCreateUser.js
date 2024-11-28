import { createUser as createUserApi } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser } = useMutation({
    mutationFn: async (obj) => await createUserApi(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { createUser };
}
