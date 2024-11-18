"use client";
import React from "react";
import CountUp from "react-countup";
export default function Counter({ amount, size = "text-2xl" }) {
  return (
    <div className={`${size} text-zinc-200 font-[100]`}>
      <CountUp
        start={0.0}
        end={amount}
        decimal="."
        prefix="$"
        duration={2.75}
        decimals={2}
      />
    </div>
  );
}
