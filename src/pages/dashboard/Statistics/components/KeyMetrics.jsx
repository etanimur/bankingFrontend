import React from "react";
import StatsCard from "../components/StatsCard";

const KeyMetrics = ({ stats }) => {
  const metrics = [
    {
      title: "Money In",
      value: stats.totalIn,
      color: "emerald",
      icon: "↑",
    },
    {
      title: "Money Out",
      value: stats.totalOut,
      color: "red",
      icon: "↓",
    },
    {
      title: "Transactions",
      value: stats.numTxns,
      color: "blue",
      icon: "⟳",
    },
    {
      title: "Average",
      value: stats.avgTxn,
      color: "amber",
      icon: "∅",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <StatsCard key={index} title={metric.title}>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-xl">{metric.icon}</span>
            <p className={`text-2xl font-bold text-${metric.color}-600`}>
              {typeof metric.value === "number"
                ? `₹${metric.value.toLocaleString()}`
                : metric.value}
            </p>
          </div>
        </StatsCard>
      ))}
    </div>
  );
};

export default KeyMetrics;
