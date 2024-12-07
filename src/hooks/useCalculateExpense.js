"use client";
import { allTransactions } from "@/lib/utils";
import { useGetCreditTransactions } from "./useGetCreditTransactions";
import { useGetDebitTransactions } from "./useGetDebitTransactions";
import { MoonLoader } from "react-spinners";
import { bills } from "@/constants/constants";
import { useEffect, useState } from "react";

export function useCalculateExpense(user) {
  const { debitTransactions, status: debitStatus } =
    useGetDebitTransactions(user);
  const { creditTransactions, status: creditStatus } =
    useGetCreditTransactions(user);
  const [isLoading, setIsloading] = useState(false);
  useEffect(
    function () {
      if (debitStatus === "pending" || creditStatus === "pending")
        setIsloading(true);
      if (debitStatus === "success" || creditStatus === "success")
        setIsloading(false);
      return () => setIsloading(false);
    },
    [debitStatus, creditStatus, setIsloading]
  );
  if (debitStatus === "pending" || creditStatus === "pending")
    return (
      <div className="flex flex-col items-center justify-center p-2 md:p-3 h-[250px] w-full md:w-[35%]  ">
        <MoonLoader speedMultiplier={0.5} color="#ea763d" size={30} />
        <p className="text-zinc-400 text-sm mt-3">
          Loading Transaction Summary...
        </p>
      </div>
    );

  const recentTransactions = isLoading
    ? []
    : [...debitTransactions, ...creditTransactions];
  const arrTransact = allTransactions(recentTransactions, user);
  const transactions = arrTransact.map((transaction) => {
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
        transaction.credImg === null ? transaction.depImg : transaction.credImg,
    };
  });
  const income = transactions
    .filter((x) => x.status === "deposit")
    .map((x) => x.amount);

  const outcome = transactions
    .filter((x) => x.status === "withdrawal")
    .map((x) => x.amount);

  const payment = transactions
    .filter(
      (y) => y.name === bills.filter((x) => x.title === y.name)?.at(0)?.title
    )
    .map((x) => x.amount);
  return { income, outcome, payment, isLoading };
}
