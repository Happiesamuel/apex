"use client";
import React from "react";
import Counter from "@/components/Countup";

import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";

import { reducedArr } from "@/lib/utils";

import { useCalculateExpense } from "@/hooks/useCalculateExpense";

export default function TransactionIncome({ user }) {
  const { income, outcome, payment, isLoading } = useCalculateExpense(user);
  return (
    <div className="grid grid-cols-2 w-full md:w-[35%] gap-5 justify-between  h-[250px]">
      <div className="flex gap-2 justify-between items-center border-2 border-[#23402d]  bg-[#212722] px-3 py-3 rounded-2xl">
        <FaArrowTrendUp className="text-4xl md:text-2xl text-[#00af5e]" />
        <div className="flex flex-col gap-1">
          <Counter
            size="text-xl"
            amount={income?.length ? reducedArr(income) : 0}
          />
          <p className="font-normal text-zinc-400 text-sm">Total Income</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center border-2 border-[#402323]  bg-[#272121] px-3 py-3 rounded-2xl  ">
        <FaArrowTrendDown className=" text-4xl md:text-2xl text-[#fa0101]" />
        <div className="flex flex-col gap-1">
          <Counter
            size="text-xl"
            amount={outcome?.length ? reducedArr(outcome) : 0}
          />
          <p className="font-normal text-zinc-400 text-sm">Total Outcome</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center border-2 border-[#403323]  bg-[#272521]  px-3 py-3 rounded-2xl  ">
        <BsCashCoin className="text-4xl md:text-2xl text-[#fa9601]" />
        <div className="flex flex-col gap-1">
          <Counter size="text-xl" amount={user?.totalBalance} />
          <p className="font-normal text-zinc-400 text-sm">Net Profit</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center border-2 border-[#402330]  bg-[#272125]  px-3 py-3 rounded-2xl  ">
        <FaMoneyBillTransfer className="text-4xl md:text-2xl text-[#fa019a]" />
        <div className="flex flex-col gap-1">
          <Counter
            size="text-xl"
            amount={payment?.length ? reducedArr(payment) : 0}
          />
          <p className="font-normal text-zinc-400 text-sm">Bills & Payment</p>
        </div>
      </div>
    </div>
  );
}
