import React from "react";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "./ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Barchart = ({ data }) => {
  return (
    <ChartContainer>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Bar dataKey="addedMangas" fill="var(--color-manga)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default Barchart;
