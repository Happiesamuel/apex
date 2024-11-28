"use client";
import { signOutAction } from "@/lib/action";
import { Toast } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useSignout() {
  const router = useRouter();
  const { status, mutate: signOut } = useMutation({
    mutationFn: async () => await signOutAction(),
    onSuccess: () => {
      Toast({
        description: "You've signed out successFully.",
        title: "Sign-out message",
      });
      router.replace("/");
    },
    onError: () => {
      Toast({
        description: "Failed to sign out!",
        title: "Sign-out message",
      });
    },
  });
  return { status, signOut };
}
