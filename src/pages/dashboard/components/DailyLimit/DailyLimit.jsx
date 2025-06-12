import React from "react";

const DailyLimit = ({ used, limit, percentage }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Daily Limit</h3>
        <span className="text-gray-500 font-medium">{percentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full mb-2">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500">
        ${used.toLocaleString()} used from ${limit.toLocaleString()} limit
      </p>
    </div>
  );
};

export default DailyLimit;
