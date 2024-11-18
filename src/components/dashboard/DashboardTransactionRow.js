"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { BiDotsHorizontal } from "react-icons/bi";
import userImg from "@/../public/asset/user-img.png";

import Image from "next/image";
import { formatDate } from "@/lib/utils";

export function DashboardTransactionRow({ transaction, findArr2 }) {
  return (
    <div className="grid grid-cols-[1fr_0.7fr_0.4fr_1fr_0.1fr] items-center text-sm text-zinc-300">
      <div className="flex gap-2 md:gap-2 items-center">
        <Checkbox id="terms1" className="outline-none border border-zinc-600" />
        {findArr2.some((x) => x.title === transaction.name) ? (
          findArr2.map((bill) => {
            if (bill.title === transaction.name)
              return (
                <div
                  key={bill.id}
                  className={`bg-[${bill.svgColDark}] text-sm p-1.5 rounded-lg`}
                >
                  {bill.svg}
                </div>
              );
            else return "";
          })
        ) : (
          <Image
            src={transaction.img ? transaction.img : userImg}
            alt="apex-logo"
            className={`rounded-full ${
              transaction.name === "Apex" && "bg-buttonOrange p-0.5"
            }`}
            width={20}
            height={20}
          />
        )}
        <p className="md:hidden">{transaction.name.split(" ").at(0)}</p>
        <p className="hidden md:block">{transaction.name}</p>
      </div>

      <p>{transaction.status}</p>
      <p
        className={
          transaction.status === "withdrawal"
            ? "text-red-500"
            : "text-green-500"
        }
      >
        {transaction.status === "withdrawal" && "-"}${transaction.amount}
      </p>
      <p className="">{formatDate(transaction.date)}</p>
      <BiDotsHorizontal />
    </div>
  );
}
