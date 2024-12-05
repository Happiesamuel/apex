"use client";
import Image from "next/image";
import React from "react";
import userImg from "@/../public/asset/user-img.png";

import { allTransactions, formatDate, isoToTimestamp } from "@/lib/utils";
import { TbReceiptOff } from "react-icons/tb";
import { bills } from "@/constants/constants";
import { useGetDebitTransactions } from "@/hooks/useGetDebitTransactions";
import { useGetCreditTransactions } from "@/hooks/useGetCreditTransactions";
import { MoonLoader } from "react-spinners";

export default function RecentTransfer({ user }) {
  const { debitTransactions, status: debitStatus } =
    useGetDebitTransactions(user);
  const { creditTransactions, status: creditStatus } =
    useGetCreditTransactions(user);
  if (debitStatus === "pending" || creditStatus === "pending")
    return (
      <div className="flex flex-col items-center justify-center h-[200px]">
        <MoonLoader speedMultiplier={0.5} color="#ea763d" size={30} />
        <p className="text-zinc-400 text-sm mt-3">Loading Transactions...</p>
      </div>
    );

  const recentTransactions = [...debitTransactions, ...creditTransactions];
  const arrTransact = allTransactions(recentTransactions, user);
  const transactions = arrTransact
    .map((transaction) => {
      return {
        id: transaction["$id"],
        name:
          transaction.credName === user.fullName
            ? transaction.depName
            : transaction.credName,
        amount: transaction.amount,
        status: transaction.status,
        date: transaction["$createdAt"],
        img:
          transaction.credImg === null
            ? transaction.depImg
            : transaction.credImg,
      };
    })
    .slice(0, 4);
  const findArr = transactions.map((x) => x.name);
  const findArr2 = [
    ...new Set(findArr.flatMap((x) => bills.filter((y) => y.title === x))),
  ];
  return (
    <div>
      <h1 className="text-xl text-zinc-200 mb-2">Recent Transactions</h1>
      {!transactions.length ? (
        <div className="flex flex-col items-center justify-center h-[100px] gap-2">
          <div className="rounded-full bg-buttonOrange p-3 text-zinc-300">
            <TbReceiptOff className="text-2xl" />
          </div>
          <p className="text-sm text-zinc-400">
            You don&apos;t have any transactions
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 py-2">
          {transactions.map((recent) => {
            return (
              <div
                key={recent.id}
                className="grid grid-cols-[1fr_0.6fr_0.5fr] items-center justify-between mx-3 bg-[#212121]  border border-zinc-800  px-2 py-3 rounded-lg"
              >
                <div className="flex gap-3 items-center">
                  {findArr2.some((x) => x.title === recent.name) ? (
                    findArr2.map((bill) => {
                      if (bill.title === recent.name)
                        return (
                          //
                          //
                          //
                          <div
                            key={bill.id}
                            className={`bg-[${bill.svgColDark}]  p-3 rounded-lg text-xl`}
                            // className={`bg-[#172e34] text-[#c6116b]`}
                            // className={`bg-[#341725] text-[#1184c6]`}
                            // className={`bg-[#3b1f1d] text-[#ffc038]`}
                            // className={`bg-[#173420] text-[#38ff45]`}
                            // className={`bg-[#3b381d] text-[#1135c6]`}
                            // className={`bg-[#2e1734] text-[]`}
                            // className={`bg-[#1b1734] text-[]`}
                            // className={`bg-[#1e3b1d] text-[]`}
                          >
                            {bill.svg}
                          </div>
                        );
                      else return "";
                    })
                  ) : (
                    <div className="w-[40px] h-[40px] relative aspect-auto">
                      <Image
                        alt="recent name"
                        src={recent.img ? recent.img : userImg}
                        fill
                        className={`rounded-full object-cover object-center ${
                          recent.name === "Apex" && "bg-buttonOrange p-2"
                        }`}
                      />
                    </div>
                  )}
                  <p className="md:hidden text-xl text-zinc-200 font-[500]">
                    {recent.name.split(" ").at(0)}
                  </p>
                  <p className="hidden md:block text-xl text-zinc-200 font-[500]">
                    {recent.name}
                  </p>
                </div>

                <p
                  className={`text-xs font-[500] ${
                    recent.status === "withdrawal"
                      ? "text-[#ff4738]"
                      : "text-[#11c64a]"
                  }`}
                >
                  {recent.status === "withdrawal" ? "Withdrawal" : "Deposit"}
                </p>
                <div className="flex flex-col items-end">
                  <p
                    className={`text-xl font-[500] ${
                      recent.status === "withdrawal"
                        ? "text-[#ff4738]"
                        : "text-[#11c64a]"
                    }`}
                  >
                    {recent.status === "withdrawal" ? "-" : ""}${recent.amount}
                  </p>
                  <p className="text-sm font-normal text-end text-zinc-400">
                    {formatDate(recent.date)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
