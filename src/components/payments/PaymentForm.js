"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import PaymentInput from "./PaymentInput";
import { capitalizeWords, generateAlphanumericID, Toast } from "@/lib/utils";
import { bills } from "@/constants/constants";
import { redirect, useRouter } from "next/navigation";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { useCreateNotification } from "@/hooks/useCreateNotification";

const formSchema = z.object({
  billName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
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

export function PaymentForm({ payname, user }) {
  const { updateUser, status: updateStatus } = useUpdateUser();
  const { createTransaction, status: transtStatus } = useCreateTransaction();
  const { createNotification, status: notifyStatus } = useCreateNotification();
  const router = useRouter();
  const payCheck = payname.split("_").join(" ");

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      billName: payCheck,
    },
  });

  async function onSubmit(values) {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 4000));
      if (+values.amount > user.totalBalance)
        Toast({
          description: `You don't have enough funds to pay for your ${capitalizeWords(
            payCheck
          )} bills`,
          title: "Insufficent fund!",
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
              totalBalance: user.totalBalance - +values.amount,
            },
          },
          {
            onError: () =>
              Toast({
                description: `failed to pay your ${capitalizeWords(
                  payCheck
                )} bills`,
                title: "Unsuccessful",
              }),
            onSuccess: () =>
              Toast({
                title: "Tranfer successfully",
                description: `You've sucessfully paid for your ${capitalizeWords(
                  payCheck
                )} bills`,
              }),
          }
        ),
          createNotification(
            {
              title: "Withdrawal",
              message: `You paid $${+values.amount} for your ${capitalizeWords(
                payCheck
              )} bills`,
              senderName: capitalizeWords(values.billName),
              image: "",
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
              onSuccess: () =>
                Toast({
                  title: "Notification",
                  description: `1 new notification!`,
                }),
            }
          ),
          createTransaction(
            {
              amount: +values.amount,
              credId: generateAlphanumericID(),
              depId: user["$id"],
              status: "withdrawal",
              credImg: null,
              credName: capitalizeWords(values.billName),
              depName: user.fullName,
            },
            {
              onSuccess: () => {
                form.reset();
                router.replace("/account/payments");
                redirect("/account/payments");
              },
            }
          );
      }
    } catch (error) {
      // setLoad(false);
    } finally {
      // setLoad(false);
    }
  }
  const bill = bills.find((b) => b.title === capitalizeWords(payCheck));
  return (
    <div className="text-zinc-100  py-5 bg-bgBlur rounded-lg border border-zinc-800 min-w-[98%] md:min-w-[80%]">
      <div className="flex justify-between items-center mx-6">
        <h1 className="capitalize text-xl  ">Payment for {payCheck}</h1>
        <div className={`bg-[${bill.svgColDark}]  p-3 rounded-lg text-xl`}>
          {bill.svg}
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mx-6 md:mx-12 my-5"
        >
          <PaymentInput
            name="billName"
            label="BillName"
            type="text"
            form={form}
            disabled={true}
          />
          <PaymentInput
            placeholder="e.g 12345"
            name="amount"
            label="Amount"
            type="number"
            form={form}
          />
          <PaymentInput
            placeholder="e.g 1234"
            name="pin"
            label="Pin"
            type="number"
            form={form}
          />
          <Button
            disabled={
              transtStatus === "pending" ||
              updateStatus === "pending" ||
              notifyStatus === "pending"
            }
            className="bg-buttonOrange"
            type="submit"
          >
            {transtStatus === "pending" ||
            updateStatus === "pending" ||
            notifyStatus === "pending"
              ? "Submitting..."
              : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
