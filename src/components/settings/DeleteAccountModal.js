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
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { Toast } from "@/lib/utils";
import { useRouter } from "next/navigation";
function DeleteAccountModal({ children, id }) {
  const { deleteStatus, deleteUser } = useDeleteUser();
  const router = useRouter();
  function handleDelete() {
    deleteUser(id, {
      onSuccess: () => {
        Toast({
          title: "Account Deleted!",
          description: `Yoou've successfully deleted your Apex account. Thank you for banking with us.`,
        });
        router.push("/");
      },
      onError: () =>
        Toast({
          description: "failed to create delete account",
          title: "Delete Error!",
        }),
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div variant="outline cursor-pointer">{children}</div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-bgBlur rounded-lg border-none font-fredoka">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-200 ">
            Delete your Account
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 text-center font-fredoka">
            Are you want to delete your Apex account? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={() => handleDelete()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAccountModal;
