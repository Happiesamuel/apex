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
import { useState } from "react";
const formSchema = z.object({
  //   file: z
  //     .instanceof(File)
  //     .refine((file) => file.type.startsWith("image/"), {
  //       message: "The file must be an image.",
  //     })
  //     .refine((file) => file.size <= 5 * 1024 * 1024, {
  //       // 5 MB limit
  //       message: "The image size must be less than or equal to 5MB.",
  //     }),
});

function SetAvatarDialog({ user }) {
  const { updateUser, status } = useUpdateUser();
  const { createNotification } = useCreateNotification();
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file);
    } else {
      setFileName(null);
    }
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (!fileName) return;
    const data = {
      id: user["$id"],
      obj: {
        image: fileName,
      },
    };

    updateUser(data, {
      onError: () =>
        Toast({
          description: `failed to upload your avatar.`,
          title: "Set Avatar failed!",
        }),
      onSuccess: () => {
        form.reset();
        Toast({
          title: "Success",
          description: `You've successfully changed your avatar`,
        });
      },
    });

    createNotification(
      {
        title: "Changed Avatar",
        message: `Congratulations. You just changed your display photo.`,
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
  function onSubmit(values) {}
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
            Set your Avatar
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
              name="file"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <FormLabel
                      className="text-zinc-200 text-center py-3 gap-4 bg-buttonOrange rounded-3xl cursor-pointer"
                      htmlFor="fileInput"
                    >
                      Choose File
                    </FormLabel>
                    <FormControl>
                      <div className="col-span-3">
                        <Input
                          type="file"
                          id="fileInput"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />

                        <div
                          id="fileName"
                          className="mt-2 text-sm text-gray-700 "
                        >
                          {fileName ? fileName.name : "No file chosen"}
                        </div>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className="text-end" />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row justify-between w-full items-center ">
              {fileName && (
                <div className="">
                  <img
                    src={URL.createObjectURL(fileName)}
                    alt="Uploaded"
                    className="h-12 w-12 object-cover rounded-md"
                  />
                </div>
              )}
              <Button
                onClick={(e) => handleSubmit(e)}
                // type="submit"
                disabled={status === "pending"}
                className="bg-buttonOrange "
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

export default SetAvatarDialog;
