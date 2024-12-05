"use client";
import React, { useState } from "react";
import userImg from "@/../public/asset/user-img.png";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { BiDotsHorizontal } from "react-icons/bi";
import { formatDate } from "@/lib/utils";
import { FaTrashCan } from "react-icons/fa6";
import Link from "next/link";
export default function TransactionRow({
  transaction,
  deleteTransaction,
  findArr2,
}) {
  const [check, setCheck] = useState(false);
  return (
    <div className=" bg-[#212121]  border border-zinc-800  px-2 py-3 rounded-lg grid grid-cols-[1fr_0.4fr_1fr_0.1fr] md:grid-cols-[1fr_0.7fr_0.4fr_1fr_1fr_0.1fr] items-center text-sm text-zinc-300">
      <div className="flex gap-2 items-center">
        <Checkbox
          onClick={() => setCheck(!check)}
          id="terms1"
          className=" data-[state=checked]:bg-buttonOrange border-buttonOrange/50"
        />
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
          <div className="relative aspect-auto w-[20px] h-[20px]">
            <Image
              src={transaction.img ? transaction.img : userImg}
              alt="apex-logo"
              className={`rounded-full object-cover object-center ${
                transaction.name === "Apex" && "bg-buttonOrange p-0.5"
              }`}
              fill
            />
          </div>
        )}
        <p className="md:hidden">{transaction.name.split(" ").at(0)}</p>
        <p className="hidden md:block">{transaction.name}</p>
      </div>

      <p className="hidden md:block">{transaction.status}</p>
      <p
        className={
          transaction.status === "withdrawal"
            ? "text-red-500"
            : "text-green-500"
        }
      >
        {transaction.status === "withdrawal" && "-"}${transaction.amount}
      </p>
      <p className="hidden md:block">{transaction.id}</p>
      <p className="">{formatDate(transaction.date)}</p>
      {!check ? (
        <Link href={`/account/transactions/${transaction.id}`}>
          <BiDotsHorizontal />
        </Link>
      ) : (
        <FaTrashCan
          className="cursor-pointer"
          onClick={() => deleteTransaction(transaction.id)}
        />
      )}
    </div>
  );
}
