"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Daily Needs", value: 200 },
  { name: "Savings", value: 50 },
  { name: "Shopping", value: 100 },
];
const COLORS = ["#b91c1c", "#d97706", "#c2410c"];

export default function DashboardPieCharts() {
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
