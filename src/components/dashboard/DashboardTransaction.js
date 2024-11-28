"use client";
import React from "react";
import { DashboardTransactionRow } from "./DashboardTransactionRow";
import { allTransactions } from "@/lib/utils";
import { bills } from "@/constants/constants";
import { useGetDebitTransactions } from "@/hooks/useGetDebitTransactions";
import { useGetCreditTransactions } from "@/hooks/useGetCreditTransactions";
import { TbReceiptOff } from "react-icons/tb";
import TransactionLoader from "../transactions/TransactionLoader";

export default function DashboardTransaction({ user }) {
  const { debitTransactions, status: debitStatus } = useGetDebitTransactions(
    user?.$id
  );
  const { creditTransactions, status: creditStatus } = useGetCreditTransactions(
    user?.$id
  );
  if (debitStatus === "pending" || creditStatus === "pending")
    return (
      <div className="w-full  bg-bgBlur border border-zinc-800 rounded-3xl py-3 px-4 ">
        <TransactionLoader type="dashboard" />
      </div>
    );

  const recentTransactions = [debitTransactions, creditTransactions];
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
    .slice(0, 3);
  const findArr = transactions.map((x) => x.name);
  const findArr2 = [
    ...new Set(findArr.flatMap((x) => bills.filter((y) => y.title === x))),
  ];
  return (
    <div className="text-zinc-100 w-full md:w-[68%] bg-bgBlur border border-zinc-800 rounded-3xl py-3 px-4 h-full mb-8 md:mb-0 min-h-[180px]">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-base text-zinc-300">Bill & Payment</h1>
        </div>
      </div>

      <ul className="mt-3 flex-col flex gap-2 mb-4">
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
          transactions.map((transaction) => (
            <DashboardTransactionRow
              findArr2={findArr2}
              key={transaction.id}
              transaction={transaction}
            />
          ))
        )}
      </ul>
    </div>
  );
}
