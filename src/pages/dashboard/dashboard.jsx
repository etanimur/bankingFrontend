import Sidebar from "../../components/shared/sidebar/sidebar";
import CardSection from "./components/CardSection";
import TransactionSection from "./components/TransactionSection";
import FinancialSummary from "./components/FinancialSummary";
import UserProfile from "./components/UserProfile";

const Dashboard = () => {
  // Mock data that matches the image
  const userData = {
    name: "Ronald Richards",
    accountType: "Personal Account",
  };

  return (
    <div className="max-w-7xl mx-auto text-left">
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
        <div className="">
          <div className="space-y-6 lg:hidden">
            <UserProfile userData={userData} />
          </div>
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
        <div className="space-y-6 max-lg:hidden">
          <UserProfile userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
