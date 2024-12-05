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
import { FaRegEdit } from "react-icons/fa";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateNotification } from "@/hooks/useCreateNotification";
import { Toast } from "@/lib/utils";

const formSchema = z.object({
  country: z.string({
    required_error: "Please select a country to display.",
  }),
});

function SetCountryDialog({ user, countries }) {
  const { updateUser, status } = useUpdateUser();
  const { createNotification } = useCreateNotification();
  const def = countries?.find((x) => x.name === user.nationality) ?? "";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: `${def.name}%${def.flag}`,
    },
  });
  function onSubmit(values) {
    const [country, flag] = values.country.split("%");
    updateUser(
      {
        id: user["$id"],
        obj: {
          nationality: country,
          countryFlag: flag,
        },
      },
      {
        onError: () =>
          Toast({
            description: `failed to set your country.`,
            title: "Set country failed!",
          }),
        onSuccess: () => {
          form.reset();
          Toast({
            title: "Success",
            description: `You've set your country`,
          });
        },
      }
    );
    createNotification(
      {
        title: "Country Name Set",
        message: `Congratulations. You just set your country name.`,
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
            Set your Country
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
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <FormLabel className="text-zinc-200 text-right gap-4 ">
                      Country:
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${def.name}%${def.flag}`}
                    >
                      <FormControl>
                        <div className="flex items-center col-span-3 w-full   px-2">
                          <SelectTrigger className="border rounded-md border-zinc-800 focus-visible:ring-0 focus:border-buttonOrange text-zinc-300">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="max-h-[250px] bg-zinc-900 border-none">
                        {countries.map((c) => (
                          <SelectItem
                            key={c.name}
                            className="text-zinc-300 hover:!text-zinc-100 cursor-pointer hover:!bg-buttonOrange transition-all duration-500"
                            value={`${c.name}%${c.flag}`}
                          >
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
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

export default SetCountryDialog;
