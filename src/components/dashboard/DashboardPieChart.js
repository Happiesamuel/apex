"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardPieCharts from "./DashboardPieCharts";
import { useGetDebitTransactions } from "@/hooks/useGetDebitTransactions";
import { useGetCreditTransactions } from "@/hooks/useGetCreditTransactions";
import { MoonLoader } from "react-spinners";
import { bills } from "@/constants/constants";
import {
  allTransactions,
  calcSlice,
  dayOfWeek,
  formatChartDate,
  modifyTransaction,
  reducedArr,
} from "@/lib/utils";
import { TbChartPieOff } from "react-icons/tb";

export default function DashboardPieChart({ user }) {
  const { debitTransactions, status: debitStatus } =
    useGetDebitTransactions(user);
  const { creditTransactions, status: creditStatus } =
    useGetCreditTransactions(user);
  const [val, setVal] = useState("monthly");
  const [day, setDay] = useState("2024");
  if (debitStatus === "pending" || creditStatus === "pending")
    return (
      <div className="text-zinc-100 flex flex-col items-center justify-center h-[180px] w-full md:w-[30%] py-3 px-3 bg-bgBlur border border-zinc-800 rounded-3xl">
        <MoonLoader speedMultiplier={0.5} color="#ea763d" size={30} />
        <p className="text-zinc-400 text-sm mt-3">
          Loading Piechart Summary...
        </p>
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
  const pieData = [...new Set(calcSlice(transactions, val))].map((v) => {
    // console.log(v);
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

  const values = [
    { id: 1, name: "Monthly", value: "monthly" },
    { id: 2, name: "Weekly", value: "weekly" },
    { id: 3, name: "Daily", value: "daily" },
  ];

  return (
    <div className="text-zinc-100 w-full md:w-[45%] py-3 px-3 bg-bgBlur border border-zinc-800 rounded-3xl">
      {!tran.length ? (
        <div className="flex flex-col items-center justify-center text-center h-[150px]  gap-2">
          <div className="rounded-full bg-buttonOrange p-3 text-zinc-300">
            <TbChartPieOff className="text-2xl" />
          </div>
          <p className="text-sm text-zinc-400">
            You don&apos;t have any transactions for your piechart
          </p>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-zinc-400 text-sm">Bills & payment</h3>
            </div>
            <div className="flex item-center gap-1">
              <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
                <SelectTrigger className=" text-zinc-500 border-none bg-zinc-800 rounded-lg">
                  <SelectValue placeholder="Monthly" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-none text-zinc-400">
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
              <Select
                onValueChange={(e) => setDay(e)}
                defaultValue={pieData.at(0).date}
              >
                <SelectTrigger className=" text-zinc-500 border-none bg-zinc-800 rounded-lg">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-none text-zinc-400 max-h-[150px]">
                  {pieData.map((x) => (
                    <SelectItem
                      key={x.date}
                      value={x.date}
                      className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
                    >
                      {formatChartDate(x.date.split("%").at(0), val)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full h-[150px] md:h-[120px]">
            <DashboardPieCharts
              pieData={pieData}
              day={day}
              setDay={setDay}
              val={val}
            />
          </div>
        </>
      )}
    </div>
  );
}
