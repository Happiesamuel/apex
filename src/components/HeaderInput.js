"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function HeaderInput({ val, setVal }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      search: val,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl onChange={(e) => setVal(e.target.value)}>
                <Input
                  placeholder="Search by name"
                  {...field}
                  className="outline-none border border-zinc-500 rounded-full
                   placeholder:text-zinc-500 focus:ring focus:ring-offset-1 focus:ring-buttonOrange"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
