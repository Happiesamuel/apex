"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSignout } from "@/hooks/useSignout";

export function SignOutModal({ children }) {
  const { signOut } = useSignout();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div variant="outline cursor-pointer">{children}</div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-bgBlur rounded-lg border-none font-fredoka">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-200 ">
            Signout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 text-center font-fredoka">
            Are you sure you want to logout? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={() => signOut()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
