import React from "react";
import { CreditCard, ArrowRight, RefreshCcw, Clock } from "lucide-react";

const CardSection = ({ cardData }) => {
  // Default card data if none is provided
  const defaultCard = {
    type: "VISA",
    number: "1424",
    holderName: "Ronald Richards",
    expiryDate: "02/30",
    balance: 10420.0,
  };

  const card = cardData || defaultCard;

  return (
    <div className="bg-white p-6 rounded-3xl flex flex-col shadow-sm">
      {/* heading text */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">My Card</h2>
        <button className="flex items-center gap-2 bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm font-medium">
          New Card
          <span className="bg-lime-200 rounded-full p-1">
            <CreditCard size={14} />
          </span>
        </button>
      </div>{" "}
      {/* main content - converted to grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Display */}
        <div className="relative">
          {/* Fixed aspect ratio for card: 16:10 (common for credit cards) */}
          <div className="bg-blue-500 rounded-xl p-5 text-white relative overflow-hidden h-56 flex flex-col justify-between border-r-lime-200 border-6 border-b-lime-200">
            <div className="flex-1 flex flex-col justify-between">
              {/* Card background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                    transform: "skewY(-20deg) translateY(-30%)",
                  }}
                ></div>
              </div>
              {/* Chip */}
              <div className="bg-yellow-400 w-10 h-7 rounded mb-6 flex items-center justify-center">
                <div className="w-8 h-5 border-2 border-yellow-600 rounded-sm"></div>
              </div>
              {/* Card number */}
              <div className="mb-4">
                <p className="text-sm opacity-80">
                  •••• •••• •••• {card.number}
                </p>
              </div>
              {/* Card holder and expiry */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-70">Card Holder name</p>
                  <p className="font-medium">{card.holderName}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">Expiry Date</p>
                  <p className="font-medium">{card.expiryDate}</p>
                </div>
              </div>{" "}
              {/* VISA logo */}
              <div className="absolute top-5 right-5 text-xl font-bold italic">
                {card.type}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          {/* Balance Display */}
          <div className="mb-6">
            <p className="text-gray-500 mb-1">Total Balance</p>
            <h3 className="text-3xl font-bold text-gray-800">
              ${card.balance.toLocaleString()}
            </h3>
          </div>

          {/* Action Buttons - now more responsive */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <button className="flex flex-col items-center justify-center py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="mb-1 bg-gray-100 p-2 rounded-full">
                <ArrowRight size={18} className="text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Transfer</span>
            </button>
            <button className="flex flex-col items-center justify-center py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="mb-1 bg-gray-100 p-2 rounded-full">
                <RefreshCcw size={18} className="text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Request</span>
            </button>
            <button className="flex flex-col items-center justify-center py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="mb-1 bg-gray-100 p-2 rounded-full">
                <Clock size={18} className="text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">History</span>
            </button>
          </div>
        </div>
      </div>{" "}
      {/* Info area */}
    </div>
  );
};

export default CardSection;
