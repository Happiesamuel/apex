import { PaymentForm } from "@/components/payments/PaymentForm";
import { getUsersByEmail } from "@/lib/action";
import { auth } from "@/lib/auth";
import React from "react";

const page = async ({ params }) => {
  const payname = params.payname;
  const session = await auth();
  const user = await getUsersByEmail(session.user.email);
  return (
    <div className="flex w-full items-center justify-center h-[80vh]">
      <PaymentForm payname={payname} user={user} />
    </div>
  );
};

export default page;
