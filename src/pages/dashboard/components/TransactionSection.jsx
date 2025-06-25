import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import mockTransactions from "./mockTransactions";
import { Link } from "react-router-dom";

const TransactionSection = ({
  accountId = 1,
  transactionType = "",
  page = 0,
  size = 5,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          id: accountId,
          type: transactionType,
          page,
          size,
        });
        const response = await fetch(
          `/api/v1/transactions?${params.toString()}`
        );
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setTransactions(data);
        } else {
          setTransactions(mockTransactions);
        }
      } catch (err) {
        console.log(err);
        setTransactions(mockTransactions);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, [accountId, transactionType, page, size]);

  // Helper to format date/time
  const formatDateTime = (isoString) => {
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = dateObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { date, time };
  };

  // Helper to get avatar info
  const getAvatar = (tx, accountId) => {
    const isIncoming = String(tx.accountTo) === String(accountId);
    const name = isIncoming ? `From ${tx.accountFrom}` : `To ${tx.accountTo}`;
    const initial = isIncoming
      ? String(tx.accountFrom)[0]
      : String(tx.accountTo)[0];
    const color = isIncoming
      ? "bg-lime-100 text-lime-700"
      : "bg-purple-100 text-purple-700";
    return { name, initial, color, isIncoming };
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Recent transaction
      </h2>

      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : transactions.length === 0 ? (
          <div className="text-gray-500">No transactions found.</div>
        ) : (
          transactions.map((transaction) => {
            const { date, time } = formatDateTime(transaction.timeStamp);
            const { name, initial, color, isIncoming } = getAvatar(
              transaction,
              accountId
            );
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-medium`}
                  >
                    {initial}
                  </div>
                  {/* Transaction details */}
                  <div>
                    <p className="text-gray-800 font-medium text-left">
                      {name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {date} • {time}
                    </p>
                  </div>
                </div>
                {/* Amount */}
                <div
                  className={`font-semibold ${
                    isIncoming ? "text-lime-500" : "text-gray-800"
                  }`}
                >
                  {isIncoming
                    ? `+$${transaction.amount}`
                    : `-$${transaction.amount}`}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* See all button */}
      <Link to={"/transactions"}>
        <button className="w-full text-center py-3 text-gray-500 mt-4 text-sm">
          See All
        </button>
      </Link>
    </div>
  );
};

export default TransactionSection;
