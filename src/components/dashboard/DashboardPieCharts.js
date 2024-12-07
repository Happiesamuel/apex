"use client";
import { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#b91c1c", "#d97706", "#c2410c"];

export default function DashboardPieCharts({ pieData, day, setDay, val }) {
  useEffect(
    function () {
      setDay(pieData.at(0).date);
    },
    [val]
  );
  const datas = pieData?.find((x) => x.date === day)?.arr ?? [];
  const data = [
    { name: "Income", value: datas.income },
    { name: "Outcome", value: datas.outcome },
    { name: "Bills & Payment", value: datas.payment },
  ];
  return (
    <ResponsiveContainer width="100%">
      <PieChart width={10} height={0}>
        <Pie
          data={data}
          innerRadius={30}
          outerRadius={50}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          align="right"
          //   formatter={renderColorfulLegendText}
          iconSize={4}
          iconType="circle"
          layout="vertical"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
