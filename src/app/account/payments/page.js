import TransferBalance from "@/components/transfer/TransferBalance";
import TransferCard from "@/components/transfer/TransferCard";
import { bills } from "@/constants/constants";
import { getUsersByEmail } from "@/lib/action";
import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await auth();
  const user = await getUsersByEmail(session.user.email);
  return (
    <div className="text-zinc-100 ">
      <div className="flex flex-col md:flex-row justify-between ">
        <TransferBalance user={user} type="payment" />
        <TransferCard user={user} />
      </div>
      <h3 className="text-xl text-zinc-200 my-3">Bills & Payments</h3>
      <div className="text-zinc-100 grid grid-cols-2  md:grid-cols-4  gap-6 py-6 mx-6 pb-20">
        {bills.map((bill) => (
          <Link
            href={`/account/payments/${bill.title
              .split(" ")
              .join("_")
              .toLowerCase()}`}
            key={bill.id}
            className="flex items-center cursor-pointer"
          >
            <div className="flex gap-2 items-center justify-center">
              <div
                // className={`bg-[#2e1734] text-xl  p-3 rounded-lg`}
                className={`bg-[${bill.svgColDark}] text-xl  p-3 rounded-lg`}
              >
                {bill.svg}
              </div>
              {/* <h4 className="text-base text-[#c611c0] ">{bill.title}</h4> */}
              <h4 className="text-base  text-zinc-300">{bill.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
