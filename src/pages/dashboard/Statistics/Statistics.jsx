/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import dummyData from "./dummyData.json";
import { getMonthRange, getLastNMonthsRanges } from "./utils/dateUtils";
import AccountBalances from "./components/AccountBalances";
import KeyMetrics from "./components/KeyMetrics";
import MonthlyTrendChart from "./components/MonthlyTrendChart";
import TransactionBreakdown from "./components/TransactionBreakdown";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = () => {
  // State Management
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalIn: 0,
    totalOut: 0,
    numTxns: 0,
    typeBreakdown: {},
    monthlyTrend: [],
    biggestTxn: null,
    avgTxn: 0,
    statusBreakdown: {},
  });

  // Data processing functions
  const calculateStatistics = (txns, userAccountIds) => {
    let totalIn = 0,
      totalOut = 0,
      numTxns = txns.length,
      sum = 0,
      maxTxn = null;
    const typeBreakdown = {};
    const statusBreakdown = {};

    txns.forEach((txn) => {
      if (userAccountIds.includes(txn.accountTo)) totalIn += txn.amount;
      if (userAccountIds.includes(txn.accountFrom)) totalOut += txn.amount;

      typeBreakdown[txn.transactionType] =
        (typeBreakdown[txn.transactionType] || 0) + 1;
      statusBreakdown[txn.transactionStatus] =
        (statusBreakdown[txn.transactionStatus] || 0) + 1;

      if (!maxTxn || txn.amount > maxTxn.amount) maxTxn = txn;
      sum += txn.amount;
    });

    return {
      totalIn,
      totalOut,
      numTxns,
      typeBreakdown,
      biggestTxn: maxTxn,
      avgTxn: numTxns ? sum / numTxns : 0,
      statusBreakdown,
    };
  };

  // API calls
  const fetchTransactionsForRange = async (range, userAccountIds) => {
    const resp = await axios.post(
      "/api/v1/transactions/filter",
      {
        startDate: range.startDate,
        endDate: range.endDate,
      },
      { params: { page: 0, size: 1000 } }
    );

    const txnsMonth = resp.data || [];
    let inAmt = 0,
      outAmt = 0;

    txnsMonth.forEach((txn) => {
      if (userAccountIds.includes(txn.accountTo)) inAmt += txn.amount;
      if (userAccountIds.includes(txn.accountFrom)) outAmt += txn.amount;
    });

    return {
      label: range.label,
      in: inAmt,
      out: outAmt,
    };
  };

  // Data fetching effect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch accounts and transactions
        const accountsRes = await axios.get("/api/v1/accounts");
        const accounts = accountsRes.data || [];
        setAccounts(accounts);

        const { startDate, endDate } = getMonthRange();
        const txnsRes = await axios.post(
          "/api/v1/transactions/filter",
          { startDate, endDate },
          { params: { page: 0, size: 1000 } }
        );
        const transactions = txnsRes.data || [];
        setTransactions(transactions);

        // Calculate statistics
        const userAccountIds = accounts.map((acc) => String(acc.accountId));
        const baseStats = calculateStatistics(transactions, userAccountIds);

        // Get monthly trends
        const monthRanges = getLastNMonthsRanges(6);
        const monthlyTrend = await Promise.all(
          monthRanges.map((range) =>
            fetchTransactionsForRange(range, userAccountIds)
          )
        );

        setStats({ ...baseStats, monthlyTrend });
      } catch (err) {
        console.error("Error fetching data:", err);
        // Fallback to dummy data
        const accounts = dummyData.accounts || [];
        const transactions = dummyData.transactions || [];
        setAccounts(accounts);
        setTransactions(transactions);

        const userAccountIds = accounts.map((acc) => String(acc.accountId));
        const baseStats = calculateStatistics(transactions, userAccountIds);

        // Calculate monthly trend from dummy data
        const monthRanges = getLastNMonthsRanges(6);
        const monthlyTrend = monthRanges.map((range) => {
          const txnsMonth = transactions.filter((txn) => {
            const ts = txn.timeStamp.replace(" ", "T");
            return (
              ts >= range.startDate.replace(" ", "T") &&
              ts <= range.endDate.replace(" ", "T")
            );
          });

          let inAmt = 0,
            outAmt = 0;
          txnsMonth.forEach((txn) => {
            if (userAccountIds.includes(txn.accountTo)) inAmt += txn.amount;
            if (userAccountIds.includes(txn.accountFrom)) outAmt += txn.amount;
          });

          return {
            label: range.label,
            in: inAmt,
            out: outAmt,
          };
        });

        setStats({ ...baseStats, monthlyTrend });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8">Loading statistics...</div>;
  }

  return (
    <div className="p-8 min-h-screen ">
      <h1 className="mb-8 text-4xl text-left font-extrabold text-slate-800 drop-shadow-sm">
        Statistics Dashboard
      </h1>

      <AccountBalances accounts={accounts} />
      <KeyMetrics stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <MonthlyTrendChart monthlyTrend={stats.monthlyTrend} />
        </div>
        <div className="lg:col-span-4">
          <TransactionBreakdown
            typeBreakdown={stats.typeBreakdown}
            statusBreakdown={stats.statusBreakdown}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
