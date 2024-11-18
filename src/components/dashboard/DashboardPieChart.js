import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardPieCharts from "./DashboardPieCharts";

export default function DashboardPieChart() {
  return (
    <div className="text-zinc-100 w-full md:w-[30%] py-3 px-3 bg-bgBlur border border-zinc-800 rounded-3xl">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h3 className="text-zinc-400 text-sm">Bills & payment</h3>
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
      <div className="w-full h-[150px] md:h-[120px]">
        <DashboardPieCharts />
      </div>
    </div>
  );
}
