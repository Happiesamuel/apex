import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Counter from "../Countup";

export default function TotalIncomeCalc({ title, rate, children }) {
  return (
    <div className="bg-bgBlur border border-zinc-800 rounded-xl md:rounded-3xl px-4 py-4 w-full md:w-[24%]  ">
      <div className="flex justify-between items-center gap-2 text-zinc-300 mb-2">
        <h3 className="text-sm">{title}</h3>
        <BsThreeDots />
      </div>
      <div className="flex gap-2 items-center">
        <Counter amount={children} />
        <p className="bg-walletColor p-1 text-xs text-textOrange w-fit rounded-full ">
          +{rate}%
        </p>
      </div>
    </div>
  );
}
