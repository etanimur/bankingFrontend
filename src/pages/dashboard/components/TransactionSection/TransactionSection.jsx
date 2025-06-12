import React from "react";
import { ChevronDown } from "lucide-react";

const TransactionSection = ({ transactions }) => {
  // Default transactions if none provided
  const defaultTransactions = [
    {
      id: 1,
      type: "incoming",
      name: "Diana",
      initial: "D",
      color: "bg-lime-100 text-lime-700",
      amount: 550.0,
      date: "Jan 24, 2024",
      time: "10:20AM",
    },
    {
      id: 2,
      type: "outgoing",
      name: "Olivia",
      initial: "O",
      color: "bg-purple-100 text-purple-700",
      amount: 230.0,
      date: "Jan 16, 2024",
      time: "11:17AM",
    },
    {
      id: 3,
      type: "outgoing",
      name: "Natasha",
      initial: "N",
      color: "bg-yellow-100 text-yellow-700",
      amount: 120.0,
      date: "Jan 8, 2024",
      time: "02:30PM",
    },
    {
      id: 4,
      type: "incoming",
      name: "Jerome",
      initial: "J",
      color: "bg-blue-100 text-blue-700",
      amount: 610.0,
      date: "Dec 20, 2023",
      time: "08:00PM",
    },
    {
      id: 5,
      type: "outgoing",
      name: "Edward",
      initial: "E",
      color: "bg-lime-100 text-lime-700",
      amount: 300.0,
      date: "Dec 15, 2023",
      time: "10:18PM",
    },
  ];

  const transactionList = transactions || defaultTransactions;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Recent transaction
      </h2>

      <div className="space-y-4">
        {transactionList.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full ${transaction.color} flex items-center justify-center font-medium`}
              >
                {transaction.initial}
              </div>

              {/* Transaction details */}
              <div>
                <p className="text-gray-800 font-medium text-left">
                  {transaction.type === "incoming"
                    ? `From ${transaction.name}`
                    : `To ${transaction.name}`}
                </p>
                <p className="text-xs text-gray-500">
                  {transaction.date} • {transaction.time}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div
              className={`font-semibold ${
                transaction.type === "incoming"
                  ? "text-lime-500"
                  : "text-gray-800"
              }`}
            >
              {transaction.type === "incoming"
                ? `+$${transaction.amount}`
                : `-$${transaction.amount}`}
            </div>
          </div>
        ))}
      </div>

      {/* See all button */}
      <button className="w-full text-center py-3 text-gray-500 mt-4 text-sm">
        See All
      </button>
    </div>
  );
};

export default TransactionSection;
