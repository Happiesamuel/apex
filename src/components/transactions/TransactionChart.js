"use client";
import React from "react";
import TransactionLineChart from "./TransactionLineChart";
import { useGetDebitTransactions } from "@/hooks/useGetDebitTransactions";
import { useGetCreditTransactions } from "@/hooks/useGetCreditTransactions";
import { allTransactions, isoToTimestamp } from "@/lib/utils";
import { MoonLoader } from "react-spinners";
import { LucideChartSpline } from "lucide-react";

export default function TransactionChart({ user }) {
  const { debitTransactions, status: debitStatus } =
    useGetDebitTransactions(user);
  const { creditTransactions, status: creditStatus } =
    useGetCreditTransactions(user);
  if (debitStatus === "pending" || creditStatus === "pending")
    return (
      <div className="flex flex-col items-center justify-center p-2 md:p-3 h-[250px] w-full md:w-[65%] border border-zinc-800 bg-bgBlur rounded-xl ">
        <MoonLoader speedMultiplier={0.5} color="#ea763d" size={30} />
        <p className="text-zinc-400 text-sm mt-3">
          Loading Transaction Chart...
        </p>
      </div>
    );

  const recentTransactions = [...debitTransactions, ...creditTransactions];
  const arrTransact = allTransactions(recentTransactions, user);
  const transactions = arrTransact
    .sort(
      (a, b) =>
        isoToTimestamp(a["$createdAt"]) - isoToTimestamp(b["$createdAt"])
    )
    .map((transaction) => {
      return {
        id: transaction["$id"],
        amount: transaction.amount,
        status: transaction.status,
        date: transaction["$createdAt"],
      };
    });
  const arrSplit = [
    ...new Set(transactions.map((x) => x.date.slice(0, 10))),
  ].map((x) => {
    return {
      date: x,
      arr: transactions.filter((notification) =>
        notification.date.startsWith(x)
      ),
    };
  });

  return (
    <div className="flex flex-col py-2 px-1 md:p-3 h-[250px] w-full md:w-[65%] border border-zinc-800 bg-bgBlur rounded-xl ">
      {!arrSplit.length ? (
        <div className="text-zinc-100 flex flex-col gap-3 items-center justify-center mt-16">
          <div className="bg-buttonOrange p-3 rounded-full text-3xl">
            <LucideChartSpline />
          </div>
          <p className="text-sm text-zinc-400">
            You don&apos;t have any transactions to view your chart.
          </p>
        </div>
      ) : (
        <TransactionLineChart arrSplit={arrSplit} />
      )}
    </div>
  );
}
