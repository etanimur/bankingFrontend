import React from "react";
import { Line } from "react-chartjs-2";
import StatsCard from "../components/StatsCard";
import { lineChartOptions, lineChartColors } from "../config/chartConfig";

const MonthlyTrendChart = ({ monthlyTrend }) => {
  const chartData = {
    labels: monthlyTrend.map((m) => m.label),
    datasets: [
      {
        label: "Money In",
        data: monthlyTrend.map((m) => m.in),
        ...lineChartColors.moneyIn,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Money Out",
        data: monthlyTrend.map((m) => m.out),
        ...lineChartColors.moneyOut,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <StatsCard title="Monthly Trend">
      <div className="h-[400px]">
        <Line data={chartData} options={lineChartOptions} />
      </div>
    </StatsCard>
  );
};

export default MonthlyTrendChart;
