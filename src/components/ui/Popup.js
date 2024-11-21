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
function Popup({ open, handleClick, type, title, heading, handleCancel }) {
  return (
    <AlertDialog defaultOpen={open}>
      {!open && <AlertDialogTrigger>Open</AlertDialogTrigger>}
      <AlertDialogContent className="bg-bgBlur rounded-lg border-2 border-buttonOrange font-fredoka">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-200 text-center ">
            {heading}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 text-center font-fredoka">
            {title}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="  w-full flex items-center justify-center">
          {type === "welcomePay" ? (
            ""
          ) : (
            <AlertDialogCancel
              onClick={() => handleCancel()}
              className="w-full"
            >
              Cancel
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={() => {
              handleClick();
              handleCancel?.();
            }}
            className={`bg-buttonOrange w-full text-zinc-100`}
          >
            {type === "welcomePay" ? "Claim" : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Popup;
