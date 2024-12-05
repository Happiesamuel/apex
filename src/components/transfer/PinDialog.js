import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

function PinDialog({ user, children, open, handleCancel, handleClick }) {
  return (
    <Dialog open={open}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="bg-bgBlur border-none">
        <DialogHeader>
          <DialogTitle className="text-zinc-200 font-[500] text-center text-xl">
            Confirm pin
          </DialogTitle>
          <DialogDescription className="py-3">{children}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button onClick={() => handleCancel()} className="w-full bg-zinc-800">
            Cancel
          </Button>

          <Button
            type="submit"
            // disabled={status === "pending"}
            className="bg-buttonOrange w-full"
            onClick={() => handleClick()}
          >
            Submit
            {/* {status === "pending" ? "Saving..." : "Save changes"} */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PinDialog;
