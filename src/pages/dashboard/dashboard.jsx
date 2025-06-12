import React from "react";
import Sidebar from "../../components/shared/sidebar/sidebar";
import CardSection from "./components/CardSection/CardSection";
import TransactionSection from "./components/TransactionSection/TransactionSection";
import FinancialSummary from "./components/FinancialSummary/FinancialSummary";
import DailyLimit from "./components/DailyLimit/DailyLimit";
import { PlusIcon } from "lucide-react";

const Dashboard = () => {
  // Mock data that matches the image
  const userData = {
    name: "Ronald Richards",
    accountType: "Personal Account",
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Hello Ronald{" "}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </h1>
              <p className="text-gray-500">Welcome back!</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content */}

            <div className="lg:col-span-2 space-y-6">
              {/* Top Card Section */}
              <CardSection />

              {/* Bottom Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Transaction Section */}
                <TransactionSection />

                {/* Financial Summaries */}
                <div>
                  <FinancialSummary
                    type="income"
                    amount="5,000.26"
                    percentage="20.12"
                  />
                  <FinancialSummary
                    type="expenses"
                    amount="260.14"
                    percentage="8.17"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6 ">
              {/* User Profile */}
              <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
                <div className="inline-block rounded-full bg-yellow-100 p-4 mb-2">
                  <img
                    src="/avatar.png"
                    alt="User avatar"
                    className="w-16 h-16 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s";
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold">{userData.name}</h3>
                <p className="text-gray-500 text-sm">{userData.accountType}</p>
                {/* Daily Limit */}{" "}
                <div className="mt-6 mb-4">
                  <DailyLimit used={12000} limit={15000} percentage={80} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
