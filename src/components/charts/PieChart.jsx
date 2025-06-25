import React from "react";
import { Pie } from "react-chartjs-2";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const PieChart = ({ data, title }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: COLORS,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: title ? true : false,
        text: title,
        position: "top",
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
