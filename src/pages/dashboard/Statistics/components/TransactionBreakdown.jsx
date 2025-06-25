import React from "react";
import StatsCard from "../components/StatsCard";
import PieChart from "../../../../components/charts/PieChart";

const TransactionBreakdown = ({ typeBreakdown, statusBreakdown }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <StatsCard title="Transaction Types">
        <PieChart data={typeBreakdown} />
      </StatsCard>
      <StatsCard title="Transaction Status">
        <PieChart data={statusBreakdown} />
      </StatsCard>
    </div>
  );
};

export default TransactionBreakdown;
