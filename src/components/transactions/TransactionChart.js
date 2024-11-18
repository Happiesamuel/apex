import React from "react";
import TransactionLineChart from "./TransactionLineChart";

export default function TransactionChart() {
  return (
    <div className="flex flex-col p-2 md:p-3 h-[250px] w-full md:w-[65%] border border-zinc-800 bg-bgBlur rounded-xl ">
      <TransactionLineChart />
    </div>
  );
}
