"use client";
import { HeaderInput } from "../HeaderInput";
import { SlEqualizer } from "react-icons/sl";
import TransactionList from "./TransactionList";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { allTransactions } from "@/lib/utils";
import { useGetDebitTransactions } from "@/hooks/useGetDebitTransactions";
import { useGetCreditTransactions } from "@/hooks/useGetCreditTransactions";

function TransactionBills({ user }) {
  const [val, setVal] = useState("");
  const [count, setCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { debitTransactions, status: debitStatus } = useGetDebitTransactions(
    user?.$id
  );
  const { creditTransactions, status: creditStatus } = useGetCreditTransactions(
    user?.$id
  );
  const sortArr = ["all", "withdrawal", "deposit"];
  // useEffect(
  //   function () {
  //     if (val.length) {
  //       const params = new URLSearchParams(searchParams);
  //       params.set("page", 1);
  //       router.push(`${pathname}?${params.toString()}`);
  //     }
  //   },
  //   [val, pathname, router, searchParams]
  // );

  useEffect(
    function () {
      function handleClick() {
        const params = new URLSearchParams(searchParams);
        params.set("sortBy", sortArr[count]);
        router.replace(`${pathname}?${params.toString()}`);
      }
      handleClick();
    },
    [pathname, router, sortArr, count, searchParams]
  );
  if (debitStatus === "pending" || creditStatus === "pending")
    return <p>loading</p>;

  const recentTransactions = [debitTransactions, creditTransactions];
  const arrTransact = allTransactions(recentTransactions, user);
  const transactionArr = arrTransact.map((transaction) => {
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

  const sortBy = searchParams.get("sortBy") || "all";
  function handleClick() {
    setCount((c) => (count < 2 ? count + 1 : 0));
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-base text-zinc-300">Bill & Payment</h1>
        <div className="flex gap-2 items-center">
          <HeaderInput val={val} setVal={setVal} />
          <div className="p-2 rounded-full  border border-zinc-800 ">
            <SlEqualizer
              onClick={() => handleClick()}
              className="text-lg text-zinc-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <Suspense
        key={sortBy}
        fallback={<p className="text-zinc-100 text-xl">load...</p>}
      >
        <TransactionList
          val={val}
          user={user}
          transactionArr={transactionArr}
        />
      </Suspense>
    </>
  );
}

export default TransactionBills;
