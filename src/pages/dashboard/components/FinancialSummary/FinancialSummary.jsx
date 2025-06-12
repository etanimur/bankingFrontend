import React from "react";

const FinancialSummary = ({ type, amount, percentage }) => {
  const isIncome = type === "income";

  return (
    <div className="bg-white rounded-3xl shadow-sm p-5 mb-5 relative overflow-hidden">
      {/* Diagonal stripes top right */}
      <div
        className="absolute top-0 right-0 z-0"
        style={{
          pointerEvents: "none",
          width: "120px",
          height: "120px",
          overflow: "hidden",
        }}
      >
        {/* Thicker stripe (gray) */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: 10,
            width: "12px",
            height: "160px",
            background: "rgba(55, 65, 81, 0.13)", // gray-700 with opacity
            transform: "rotate(45deg)",
            filter: "blur(3px)",
          }}
        />
        {/* Thinner stripe (gray) */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: 40,
            width: "6px",
            height: "160px",
            background: "rgba(31, 41, 55, 0.18)", // gray-800 with more opacity
            transform: "rotate(-45deg)",
            filter: "blur(2px)",
          }}
        />
      </div>
      <div className="flex items-start flex-col mb-1 relative z-10">
        <div className="bg-gray-100 p-2 rounded-lg mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={
                isIncome
                  ? "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
                  : "M9 14l6-6m-5 5l-7 7m3-3h7a4 4 0 0 0 0-8H5"
              }
              stroke="#4B5563"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <br />
        <h3 className="text-gray-500 font-bold">
          Total {isIncome ? "Income" : "Expenses"}
        </h3>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">${amount}</h2>
        <div
          className={`flex items-center text-xs font-medium ${
            isIncome ? "text-lime-600" : "text-red-500"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d={isIncome ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              stroke={isIncome ? "#65a30d" : "#ef4444"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-xl font-bold">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
