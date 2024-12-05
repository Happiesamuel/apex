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
import { useState } from "react";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateNotification } from "@/hooks/useCreateNotification";
import { Toast } from "@/lib/utils";

const formSchema = z
  .object({
    pin: z
      .string()
      .min(2, {
        message: "Pin must be at least 2 digit.",
      })
      .max(4, {
        message: "Pin must be at least 4 digit.",
      })
      .regex(/^\d+$/, {
        message: "Pin must contain only numbers.",
      }),

    confirm: z
      .string()
      .min(2, {
        message: "Confirm pin must be at least 2 digit.",
      })
      .max(4, {
        message: "Confirm pin must be at least 4 digit.",
      })
      .regex(/^\d+$/, {
        message: "Confirm Pin must contain only numbers.",
      }),
  })
  .refine((data) => data.pin === data.confirm, {
    message: "The pin and confirm pin  must match.",
    path: ["confirm"],
  });

function SetPinDialog({ user }) {
  const [showPin, setShowPin] = useState(false);
  const [confirmShowPin, setConfirmShowPin] = useState(false);
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
          pin: +values.pin,
        },
      },
      {
        onError: () =>
          Toast({
            description: `failed to set transfer pin`,
            title: "Set pin failed!",
          }),
        onSuccess: () => {
          form.reset();
          Toast({
            title: "Success",
            description: `You've set your transfer pin`,
          });
        },
      }
    );
    createNotification(
      {
        title: "Transfer Pin Set",
        message: `Congratulations. You just set your transfer pin. You can go ahead and make some transactions.`,
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
            Set your transfer pin
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
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <FormLabel className="text-zinc-200 text-right gap-4 ">
                      PIN:
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center col-span-3 w-full border rounded-md border-zinc-800  px-2">
                        <Input
                          placeholder="Enter your pin "
                          {...field}
                          type={showPin ? "number" : "password"}
                          className=" text-zinc-400 text-sm border-none  focus-visible:ring-0 "
                        />
                        <FaEyeSlash
                          onClick={() => setShowPin(!showPin)}
                          className="text-zinc-400 text-lg cursor-pointer"
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className="text-end" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <FormLabel className="text-zinc-200 text-right gap-4 ">
                      Confirm PIN:
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center col-span-3 w-full border rounded-md border-zinc-800  px-2">
                        <Input
                          placeholder="Confirm your pin "
                          {...field}
                          type={confirmShowPin ? "text" : "password"}
                          className=" text-zinc-400 text-sm border-none  focus-visible:ring-0 "
                        />
                        <FaEyeSlash
                          onClick={() => setConfirmShowPin(!confirmShowPin)}
                          className="text-zinc-400 text-lg cursor-pointer"
                        />
                      </div>
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

export default SetPinDialog;
