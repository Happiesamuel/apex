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
import { cashFlowButtons } from "@/constants/constants";
import { Button } from "../ui/button";
import { LuLineChart } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import DashboardAreaChart from "./DashboardAreaChart";

export default function DashboardCashflow({ user }) {
  const [butId, setButId] = useState(0);
  return (
    <div className="text-zinc-100 w-full md:w-[67%] py-3 px-3 bg-bgBlur border border-zinc-800 rounded-3xl">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h3 className="text-zinc-400 text-sm">Cash flow</h3>
          <Counter amount={236788.12} />
        </div>
        <Select>
          <SelectTrigger className="w-[180px] text-zinc-500 border-none bg-zinc-800 rounded-full">
            <SelectValue placeholder="Monthly" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-none text-zinc-400">
            <SelectItem
              value="monthly"
              className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
            >
              Monthly
            </SelectItem>
            <SelectItem
              value="weekly"
              className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
            >
              Weekly
            </SelectItem>
            <SelectItem
              value="daily"
              className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
            >
              Daily
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="flex gap-2">
          {cashFlowButtons.map((but) => (
            <Button
              key={but.id}
              className={`py-2 rounded-full border-zinc-700 border  ${
                but.id === butId && "bg-zinc-800 text-zinc-400 border-none"
              }`}
            >
              {but.title}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 text-zinc-400  text-lg">
          <LuLineChart />
          <BsThreeDots />
        </div>
      </div>
      <DashboardAreaChart />
    </div>
  );
}
