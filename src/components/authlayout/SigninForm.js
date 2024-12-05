"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import apexLogo from "@/../public/asset/apex-logo.png";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import { getUsersByEmail } from "@/lib/action";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { formatRelativeTime, generateAccountNumber, Toast } from "@/lib/utils";
import { useSignUp } from "@/hooks/useSignUp";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useCreateNotification } from "@/hooks/useCreateNotification";
import { format } from "date-fns";

export function SigninForm({ type }) {
  const [loading, setLoading] = useState(false);
  const { signUp } = useSignUp();
  const { updateUser } = useUpdateUser();
  const { createUser } = useCreateUser();
  const { createNotification } = useCreateNotification();
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username:
      type === "sign-in" || type === "reset"
        ? z.string().optional()
        : z.string().min(3),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  async function onSubmit(values) {
    setLoading(true);
    try {
      if (type === "sign-up") {
        const existedUser = await getUsersByEmail(values.email);
        if (existedUser)
          return Toast({
            title: "Account already existed",
            description: "You've created account with this email...",
          });
        else {
          return createUser(
            {
              email: values.email,
              fullName: values.username,
              password: values.password,
              accountNumber: generateAccountNumber(),
              totalBalance: 0,
              welcomePay: false,
              countryFlag: "",
              nationality: "",
              image: "",
              displayName: "",
              pin: null,
            },
            {
              onSuccess: () => {
                Toast({
                  description: "You've sign up  successfully",
                  title: "Sign-up message",
                });
                router.replace("/auth/sign-in");
                // redirect("/auth/sign-in");
              },
              onError: () =>
                Toast({
                  description: "Failed to sign up",
                  title: "Sign-up message",
                }),
            }
          );
        }
      }
      if (type === "sign-in") {
        const existedUser = await getUsersByEmail(values.email);
        if (!existedUser)
          return Toast({
            description: "Invalid credentials",
            title: "Account does not exist!",
          });
        else if (values.password !== existedUser.password) {
          return Toast({
            description: "The password you have entered is incorrect!",
            title: "Incorrect password",
          });
        } else {
          signUp(
            { ...values },
            {
              onSuccess: () => {
                Toast({
                  description: "You've Logged in successfully",
                  title: "Sign-in message",
                });
              },
              onError: () => {
                Toast({
                  description: "Failed to sign in to Apex bank!",
                  title: "Sign-in message",
                });
              },
            }
          );
          await new Promise((resolve) => setTimeout(resolve, 5000));
          router.push("/account");
        }
        createNotification(
          {
            title: "Loan Request",
            message: `You logged in to your Apex account ${formatRelativeTime(
              formattedDate
            )}`,
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
              router.push("/account");
              Toast({
                title: "Notification",
                description: `1 new notification!`,
              });
            },
          }
        );
      }
      if (type === "reset") {
        const existedUser = await getUsersByEmail(values.email);

        if (!existedUser)
          return Toast({
            description: "Invalid Email",
            title: "Email does not exist!",
          });
        else {
          updateUser(
            {
              id: existedUser["$id"],
              obj: {
                password: values.password,
              },
            },
            {
              onSuccess: () =>
                Toast({
                  description: "Password reset successfully!",
                  title: "You've successfully reset yout password",
                }),
              onError: () => {
                Toast({
                  description: "Failed request",
                  title: "Failed to rest your password",
                });
              },
            }
          );
        }
        router.replace("/auth/sign-in");
        redirect("/auth/sign-in");
      }

      setLoading(false);
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
    // form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mt-6 mb-2"
      >
        {type === "sign-up" && (
          <FormInput
            name="username"
            placeholder="Enter your username"
            label="Username"
            form={form}
            type="text"
          />
        )}
        <FormInput
          name="email"
          placeholder="Enter your email address"
          label="Email"
          form={form}
          type="email"
        />
        <FormInput
          name="password"
          placeholder={`Enter your ${type === "reset" ? "new" : ""} password`}
          label={type === "reset" ? "New password" : "Password"}
          form={form}
          type="password"
        />
        <Button type="submit" className="bg-buttonOrange">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
