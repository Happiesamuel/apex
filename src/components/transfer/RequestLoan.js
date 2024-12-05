"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import TransferFormField from "./TransferFormField";
import Popup from "../ui/Popup";
import apexLogo from "@/../public/asset/apex-logo.png";
import { Toast } from "@/lib/utils";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { useCreateNotification } from "@/hooks/useCreateNotification";
import PinDialog from "./PinDialog";

const formSchema = z.object({
  amount: z.string().min(2),
  pin: z
    .string()
    .min(2, {
      message: "Pin must be at least 2 digit.",
    })
    .max(4, {
      message: "Pin must be at least 4 digit.",
    }),
});

export default function RequestForm({ setId, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const { updateUser, status: updateStatus } = useUpdateUser();
  const { createTransaction, status: transtStatus } = useCreateTransaction();
  const { createNotification } = useCreateNotification();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  function handleShowModal() {
    if (!value) return setIsOpen(false);
    setIsOpen(true);
  }

  async function onSubmit(values) {
    try {
      if (+values.amount < 1)
        Toast({
          title: "Invalid amount",
          description: `Please enter a valid amount`,
        });
      if (user.totalBalance < 100 || +values.amount >= user.totalBalance)
        Toast({
          title: "Request Failed",
          description: `Your account balance is too low to borrow money from Apex.`,
        });
      if (!user.pin)
        Toast({
          title: "PIN ERROR!",
          description: `You've not set your trasaction pin. Go to settings to set your transfer pin.`,
        });
      if (+values.pin !== user.pin)
        Toast({
          title: "Wrong PIN!",
          description: `The pin you entered is incorrect!.`,
        });
      else {
        updateUser(
          {
            id: user["$id"],
            obj: {
              totalBalance: user.totalBalance + +values.amount,
            },
          },
          {
            onError: () =>
              Toast({
                description: "failed to get loan from Apex!",
                title: "Unsuccessful",
              }),
            onSuccess: () => {
              form.reset();
              Toast({
                title: "Credited!",
                description: `You've been credited $${values.amount} from Apex`,
              });
            },
          }
        );
        createTransaction({
          amount: +values.amount,
          credId: user["$id"],
          depId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
          status: "deposit",
          depImg: apexLogo.src,
          credName: user.fullName,
          depName: "Apex",
        }),
          createNotification(
            {
              title: "Loan Request",
              message: `You've been credited $${+values.amount} from Apex bank`,
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
                  description:
                    "failed to create notificatiion for this transaction!",
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
          ),
          setValue("");
        setIsOpen(false);
      }
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 px-3 py-3 my-3 mr-3"
      >
        <TransferFormField
          onchange={(val) => setValue(val)}
          name="amount"
          disabled={false}
          type="number"
          form={form}
          placeholder="Enter Amount"
        />

        <div className="flex gap-3">
          <Button
            onClick={() => handleShowModal()}
            type="reset"
            className="w-full bg-buttonOrange"
          >
            Submit
          </Button>
          <Button onClick={() => setId(null)} className="w-full bg-bgBlur">
            Cancel
          </Button>
        </div>
        {isOpen && (
          <PinDialog
            user={user}
            open={isOpen}
            handleCancel={() => setIsOpen(false)}
            handleClick={form.handleSubmit(onSubmit)}
          >
            <TransferFormField
              user={user}
              name="pin"
              disabled={false}
              type="number"
              form={form}
              placeholder="Enter Pin"
            />
          </PinDialog>
        )}
      </form>
    </Form>
  );
}
