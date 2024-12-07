"use client";
import { formatChartDate, reducedArr } from "@/lib/utils";
import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Legend,
  YAxis,
} from "recharts";

const TransactionLineChart = ({ arrSplit }) => {
  const data = arrSplit.map((x) => {
    return {
      date: formatChartDate(x.date),
      pv: reducedArr(x.arr.map((x) => x.amount)),
    };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#ea763d" strokeWidth={2} />
        <XAxis dataKey="date" stroke="#d4d4d8" />
        <YAxis stroke="#d4d4d8" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionLineChart;
