"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PaymentInput from "./PaymentInput";
import { useState } from "react";
import {
  createNotification,
  createTransactions,
  updateUser,
} from "@/lib/action";
import { capitalizeWords, generateAlphanumericID, Toast } from "@/lib/utils";
import { bills } from "@/constants/constants";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
  billName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  amount: z.string().min(2),
  pin: z.string().min(2),
});

export function PaymentForm({ payname, user }) {
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const payCheck = payname.split("_").join(" ");

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      billName: payCheck,
    },
  });

  async function onSubmit(values) {
    setLoad(true);
    try {
      await Promise.all([
        // updateUser(user["$id"], {
        //   totalBalance: user.totalBalance - +values.amount,
        // }),
        // createTransactions({
        //   amount: +values.amount,
        //   credId: generateAlphanumericID(),
        //   depId: user["$id"],
        //   status: "withdrawal",
        //   credImg: null,
        //   credName: capitalizeWords(values.billName),
        //   depName: user.fullName,
        // }),

        createNotification({
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
        }),
      ]);
      Toast({
        title: "Tranfer successfully",
        description: `You've sucessfully paid for your ${capitalizeWords(
          payCheck
        )} bills`,
      });
      form.reset();
      router.replace("/payments");
      redirect("/payments");
    } catch (error) {
      setLoad(false);
    } finally {
      setLoad(false);
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
            placeholder="e.g 12345"
            name="pin"
            label="Pin"
            type="number"
            form={form}
          />
          <Button className="bg-buttonOrange" type="submit">
            {load ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
