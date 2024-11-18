"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import {
  createUser,
  getUsersByEmail,
  signInWithCredentials,
  updateUser,
} from "@/lib/action";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { generateAccountNumber, Toast } from "@/lib/utils";

export function SigninForm({ type }) {
  const [loading, setLoading] = useState(false);
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
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      if (type === "sign-up") {
        // const existedUser = await getUser(values.email);
        const existedUser = await getUsersByEmail(values.email);
        if (existedUser)
          return Toast({
            title: "Account already existed",
            description: "You've created account with this email...",
          });
        else {
          await createUser({
            email: values.email,
            fullName: values.username,
            password: values.password,
            accountNumber: generateAccountNumber(),
            totalBalance: 0,
            welcomePay: false,
            countryFlag: "",
            nationality: "",
            image: "",
          });
          Toast({
            description: "You've sign up  successfully",
            title: "Sign-up message",
          });
          router.replace("/user/sign-in");
          redirect("/user/sign-in");
        }
      }
      if (type === "sign-in") {
        const existedUser = await getUsersByEmail(values.email);
        console.log(existedUser);
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
          console.log({ ...values });
          await signInWithCredentials({ ...values });
          Toast({
            description: "You've Logged in successfully",
            title: "Sign-in message",
          });

          router.replace("/account");
          redirect("/account");
        }
      }
      if (type === "reset") {
        const existedUser = await getUsersByEmail(values.email);

        if (!existedUser)
          return Toast({
            description: "Invalid Email",
            title: "Email does not exist!",
          });
        else {
          await updateUser(existedUser["$id"], {
            password: values.password,
          });
          Toast({
            description: "Password reset successfully!",
            title: "You've successfully reset yout password",
          });
        }
        router.replace("/user/sign-in");
        redirect("/user/sign-in");
      }

      setLoading(false);

      router.replace("/account");
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
    form.reset();
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
