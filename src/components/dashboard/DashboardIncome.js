import React from "react";
import TotalIncomeCalc from "./TotalIncomeCalc";

export default function DashboardIncome({ user }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 md:flex flex-wrap items-center w-full justify-between mt-6 ">
      {" "}
      <TotalIncomeCalc title="Total Balance" rate={2.5}>
        {user?.totalBalance}
      </TotalIncomeCalc>
      <TotalIncomeCalc title="Monthly Income" rate={2.5}>
        {58155.99}
      </TotalIncomeCalc>
      <TotalIncomeCalc title="Monthly Expenses" rate={8}>
        {58155.99}
      </TotalIncomeCalc>
      <TotalIncomeCalc title="Monthly Savings" rate={8}>
        {58155.99}
      </TotalIncomeCalc>
    </div>
  );
}
