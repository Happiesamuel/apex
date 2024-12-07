"use client";
import React from "react";
import TotalIncomeCalc from "./TotalIncomeCalc";
import { useCalculateExpense } from "@/hooks/useCalculateExpense";
import { reducedArr } from "@/lib/utils";

export default function DashboardIncome({ user }) {
  const { income, outcome, payment, isLoading } = useCalculateExpense(user);
  if (isLoading) return <p>sam</p>;
  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 items-center w-full justify-between mt-6 ">
      {" "}
      <TotalIncomeCalc title="Total Balance" rate={2.5}>
        {user?.totalBalance}
      </TotalIncomeCalc>
      <TotalIncomeCalc title="Monthly Income" rate={2.5}>
        {income?.length ? reducedArr(income) : 0}
      </TotalIncomeCalc>
      <TotalIncomeCalc title="Monthly Outcome" rate={8}>
        {outcome?.length ? reducedArr(outcome) : 0}
      </TotalIncomeCalc>
      <TotalIncomeCalc title="Monthly Bills & Payments" rate={8}>
        {payment?.length ? reducedArr(payment) : 0}
      </TotalIncomeCalc>
    </div>
  );
}
