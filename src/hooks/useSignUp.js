"use client";
import { signInWithCredentials } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignUp() {
  const queryClient = useQueryClient();
  const { mutate: signUp, status } = useMutation({
    mutationFn: async (obj) => {
      signInWithCredentials(obj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["signup"] });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  return { status, signUp };
}
