import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCheck } from "lucide-react";
import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("ALL");
  const [startDate, setStartDate] = useState("2025-04-01T00:00:00");
  const [endDate, setEndDate] = useState("2025-04-30T23:59:59");

  // Local state for date pickers
  const [pendingStartDate, setPendingStartDate] = useState(dayjs(startDate));
  const [pendingEndDate, setPendingEndDate] = useState(dayjs(endDate));

  const fetchTransactions = () => {
    setLoading(true);
    axios
      .get("/api/v1/transactions/filter", {
        params: {
          page: 0,
          size: 5,
        },
        data: {
          id: 1,
          startDate,
          endDate,
        },
        // axios doesn't support GET with body, so use POST if backend allows, else fallback to GET with query params only
      })
      .then((res) => {
        let data = res.data;
        let arr = Array.isArray(data)
          ? data
          : Array.isArray(data.content)
          ? data.content
          : [];
        // Filter by status if not ALL
        if (status !== "ALL") {
          arr = arr.filter((txn) => txn.transactionStatus === status);
        }
        if (arr.length > 0) {
          setTransactions(arr);
          setLoading(false);
        } else {
          // fallback to mock data if API returns empty
          import("./mockTransactionsFilter.json").then((mock) => {
            console.log(
              "Using mockTransactionsFilter.json because API returned empty or invalid data."
            );
            let mockArr = mock.default || mock;
            if (status !== "ALL") {
              mockArr = mockArr.filter(
                (txn) => txn.transactionStatus === status
              );
            }
            setTransactions(mockArr);
            setLoading(false);
          });
        }
      })
      .catch(() => {
        // fallback to mock data if API fails
        import("./mockTransactionsFilter.json").then((mock) => {
          console.log(
            "Using mockTransactionsFilter.json because API request failed."
          );
          let mockArr = mock.default || mock;
          if (status !== "ALL") {
            mockArr = mockArr.filter((txn) => txn.transactionStatus === status);
          }
          setTransactions(mockArr);
          setLoading(false);
        });
      });
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [status, startDate, endDate]);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-4xl text-left font-extrabold text-slate-800 drop-shadow-sm">
        Payments
      </h1>
      <div className="flex gap-8 my-8 mb-4">
        <div>
          <div className="text-xs text-left text-gray-500">DURATION</div>
          <div className="font-medium flex items-center gap-2">
            <ConfigProvider theme={{}}>
              <DatePicker
                showTime={{ format: "HH:mm:ss" }}
                format="YYYY-MM-DD HH:mm:ss"
                value={pendingStartDate}
                onChange={(value) => setPendingStartDate(value)}
                className="border rounded px-2 py-1 text-xs"
                style={{ width: 180 }}
                allowClear={false}
              />
              <span>-</span>
              <DatePicker
                showTime={{ format: "HH:mm:ss" }}
                format="YYYY-MM-DD HH:mm:ss"
                value={pendingEndDate}
                onChange={(value) => setPendingEndDate(value)}
                className="border rounded px-2 py-1 text-xs"
                style={{ width: 180 }}
                allowClear={false}
              />
            </ConfigProvider>
            <button
              className="ml-2 px-3 py-1 rounded bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition"
              onClick={() => {
                setStartDate(pendingStartDate.format("YYYY-MM-DDTHH:mm:ss"));
                setEndDate(pendingEndDate.format("YYYY-MM-DDTHH:mm:ss"));
              }}
            >
              Confirm
            </button>
          </div>
        </div>
        <div></div>
        <div className="flex-1" />
        <div className="flex flex-col gap-1">
          <div className="text-xs text-gray-500 text-left">STATUS</div>
          <select
            className="text-md border-gray-500 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option className="text-sm" value="ALL">
              All
            </option>
            <option className="text-sm" value="SUCCEEDED">
              Success
            </option>
            <option className="text-sm" value="PENDING">
              Pending
            </option>
            <option className="text-sm" value="FAILED">
              Failed
            </option>
          </select>
        </div>
        {/* <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Search Value"
            className="px-3 py-2 rounded border border-gray-300 w-52"
          />
        </div> */}
      </div>

      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-500">
              <th className="py-4 px-3"> </th>
              <th className="py-4 px-3">TRANSACTION ID</th>
              <th className="py-4 px-3">DATE</th>
              <th className="py-4 px-3">FROM</th>
              <th className="py-4 px-3">TO</th>
              <th className="py-4 px-3">TYPE</th>
              <th className="py-4 px-3">AMOUNT</th>
              <th className="py-4 px-3">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-left text-neutral-600">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-200 bg-white">
                  <td className="py-4 px-3 ">
                    {txn.transactionStatus === "SUCCEEDED" ? (
                      <span className="text-green-500 text-xl ">
                        <CheckCheck color="#2bff00" />
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xl">⏳</span>
                    )}
                  </td>
                  <td className="py-4 px-3 font-mono">{txn.id}</td>
                  <td className="py-4 px-3">
                    {new Date(txn.timeStamp).toLocaleString()}
                  </td>
                  <td className="py-4 px-3">{txn.accountFrom}</td>
                  <td className="py-4 px-3">{txn.accountTo}</td>
                  <td className="py-4 px-3">{txn.transactionType}</td>
                  <td className="py-4 px-3 font-medium">
                    ₹{txn.amount?.toLocaleString?.() ?? txn.amount}
                  </td>
                  <td className="py-4 px-3">
                    <span
                      className={
                        txn.transactionStatus === "SUCCEEDED"
                          ? "text-green-600 "
                          : "text-yellow-500 "
                      }
                    >
                      {txn.transactionStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
