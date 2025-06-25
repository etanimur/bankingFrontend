import React from "react";
import StatsCard from "../components/StatsCard";

const AccountBalances = ({ accounts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {(Array.isArray(accounts) ? accounts : []).map((acc) => (
        <StatsCard key={acc.accountId} title={acc.accountType}>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            ₹{acc.balance.toLocaleString()}
          </p>
          <span
            className={`mt-4 px-4 py-1 rounded-full text-xs font-medium inline-block
            ${
              acc.status === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {acc.status}
          </span>
        </StatsCard>
      ))}
    </div>
  );
};

export default AccountBalances;
