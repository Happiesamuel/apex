"use client";
import React, { useState } from "react";
import Counter from "../Countup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bills, cashFlowButtons } from "@/constants/constants";
import { Button } from "../ui/button";
import DashboardAreaChart from "./DashboardAreaChart";
import { useGetCreditTransactions } from "@/hooks/useGetCreditTransactions";
import { useGetDebitTransactions } from "@/hooks/useGetDebitTransactions";
import {
  allTransactions,
  calcSlice,
  formatChartDate,
  modifyTransaction,
  reducedArr,
} from "@/lib/utils";
import { LucideChartSpline } from "lucide-react";
import { MoonLoader } from "react-spinners";

export default function DashboardCashflow({ user }) {
  const [butId, setButId] = useState(0);
  const [val, setVal] = useState("daily");
  const { debitTransactions, status: debitStatus } =
    useGetDebitTransactions(user);
  const { creditTransactions, status: creditStatus } =
    useGetCreditTransactions(user);
  if (debitStatus === "pending" || creditStatus === "pending")
    return (
      <div className="text-zinc-100 w-full h-[340px] flex flex-col items-center justify-center md:w-[60%] lg:w-[60%] xl:w-[67%] py-3 px-3 bg-bgBlur border border-zinc-800 rounded-3xl">
        <MoonLoader speedMultiplier={0.5} color="#ea763d" size={30} />
        <p className="text-zinc-400 text-sm mt-3">Loading AreaChart Data...</p>
      </div>
    );

  const recentTransactions = [...debitTransactions, ...creditTransactions];
  const arrTransact = allTransactions(recentTransactions, user);
  const tran = arrTransact.map((transaction) => {
    return {
      id: transaction["$id"],
      name:
        transaction.credName === user.fullName
          ? transaction.depName
          : transaction.credName,
      amount: transaction.amount,
      status: transaction.status,
      date: transaction["$createdAt"],
    };
  });
  const transactions = modifyTransaction(tran);
  const areaData = [...new Set(calcSlice(transactions, val))].map((v) => {
    return {
      date: v,
      arr: [
        ...new Set(
          transactions
            .filter((transaction) => transaction.data.startsWith(v))
            .map((x) => x.status)
            .map((x) => {
              const income = transactions
                .filter((y) => y.status === "deposit" && y.data.startsWith(v))
                .map((x) => x.amount);
              const outcome = transactions
                .filter(
                  (y) => y.status === "withdrawal" && y.data.startsWith(v)
                )
                .map((x) => x.amount);
              const payment = transactions
                .filter(
                  (y) =>
                    y.name ===
                      bills.filter((x) => x.title === y.name)?.at(0)?.title &&
                    y.data.startsWith(v)
                )
                .map((x) => x.amount);
              return {
                income: income.length ? reducedArr(income) : 0,
                outcome: outcome.length ? reducedArr(outcome) : 0,
                payment: payment.length ? reducedArr(payment) : 0,
              };
            })
        ),
      ].at(0),
    };
  });
  const data = areaData.map((x) => {
    return {
      name: formatChartDate(x.date.split("%").at(0), val),
      uv:
        butId === 0
          ? x.arr.income
          : butId === 1
          ? x.arr.outcome
          : x.arr.payment,
    };
  });
  const cashFlow = data.map((x) => x.uv).length
    ? reducedArr(data.map((x) => x.uv))
    : 0;
  const values = [
    { id: 1, name: "Daily", value: "daily" },
    { id: 2, name: "Weekly", value: "weekly" },
    { id: 3, name: "Monthly", value: "monthly" },
  ];
  return (
    <div className="text-zinc-100 w-full md:w-[60%] lg:w-[60%] xl:w-[67%] py-3 px-3 bg-bgBlur border border-zinc-800 rounded-3xl">
      {!tran.length ? (
        <div className="flex flex-col items-center justify-center text-center h-[320px]  gap-2">
          <div className="rounded-full bg-buttonOrange p-3 text-zinc-300">
            <LucideChartSpline className="text-2xl" />
          </div>
          <p className="text-sm text-zinc-400">
            You don&apos;t have any transactions for your AreaChart
          </p>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-zinc-400 text-sm">Cash flow</h3>
              <Counter amount={cashFlow} />
            </div>
            <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
              <SelectTrigger className="w-[180px] text-zinc-500 border-transparent  focus:border-buttonOrange bg-zinc-800 rounded-full ">
                <SelectValue placeholder="Daily" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-none text-zinc-400 ">
                {values.map((x) => (
                  <SelectItem
                    key={x.id}
                    value={x.value}
                    className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
                  >
                    {x.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex gap-2">
              {cashFlowButtons.map((but) => (
                <Button
                  key={but.id}
                  onClick={() => setButId(but.id)}
                  className={`py-2 rounded-full border-zinc-700 border  ${
                    but.id === butId && "bg-zinc-800 text-zinc-400 border-none"
                  }`}
                >
                  {but.title}
                </Button>
              ))}
            </div>
          </div>
          <DashboardAreaChart data={data} />
        </>
      )}
    </div>
  );
}
