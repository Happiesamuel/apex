"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaEyeSlash, FaRegEdit } from "react-icons/fa";
import apexLogo from "@/../public/asset/apex-logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateNotification } from "@/hooks/useCreateNotification";
import { Toast } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

function SetDisplayNameDialog({ user }) {
  const { updateUser, status } = useUpdateUser();
  const { createNotification } = useCreateNotification();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values) {
    updateUser(
      {
        id: user["$id"],
        obj: {
          displayName: values.name,
        },
      },
      {
        onError: () =>
          Toast({
            description: `failed to set your display name.`,
            title: "Set display name failed!",
          }),
        onSuccess: () => {
          form.reset();
          Toast({
            title: "Success",
            description: `You've set your display name`,
          });
        },
      }
    );
    createNotification(
      {
        title: "Display Name Set",
        message: `Congratulations. You just set your display name.`,
        senderName: "Apex",
        image: apexLogo.src,
        status: false,
        senderId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        recieverId: user["$id"],
        recieverName: user.fullName,
      },
      {
        onError: () =>
          Toast({
            description: "failed to create notificatiion",
            title: "Notification error",
          }),
        onSuccess: () => {
          form.reset();
          Toast({
            title: "Notification",
            description: `1 new notification!`,
          });
        },
      }
    );
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-1 text-green-500 cursor-pointer">
          <FaRegEdit /> <p>Edit</p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-bgBlur border-none">
        <DialogHeader>
          <DialogTitle className="text-zinc-200 font-[500] text-xl">
            Set your profile name
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <FormLabel className="text-zinc-200 text-right gap-4 ">
                      Display Name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g John"
                        {...field}
                        type="text"
                        className=" text-zinc-400 text-sm focus:border-buttonOrange focus-visible:ring-0 col-span-3 w-full border rounded-md border-zinc-800  px-2 "
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-end" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={status === "pending"}
                className="bg-buttonOrange"
              >
                {status === "pending" ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default SetDisplayNameDialog;
