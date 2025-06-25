import React, { useState, useRef, useEffect } from "react";

const UserProfile = ({ userData }) => {
  const [showFloating, setShowFloating] = useState(false);
  const dropdownRef = useRef(null);

  // Helper to detect small/medium screens
  const isSmallScreen = () => window.matchMedia("(max-width: 1023px)").matches;

  const handleAvatarClick = () => {
    if (isSmallScreen()) setShowFloating((prev) => !prev); // toggles open/close
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    if (!showFloating) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFloating(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFloating]);

  return (
    <div>
      {/* User Profile */}
      <div className="bg-white rounded-3xl shadow-sm lg:p-6 text-center relative">
        <div
          className="lg:inline-block max-lg:p-2 rounded-full bg-yellow-100 lg:p-4 lg:mb-2 cursor-pointer"
          onClick={handleAvatarClick}
        >
          <img
            src="/avatar.png"
            alt="User avatar"
            className="max-lg:w-8 max-lg:h-8 lg:w-16 lg:h-16 rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s";
            }}
          />
        </div>
        {/* Dropdown for small/medium screens */}
        <div className="relative">
          <div
            ref={dropdownRef}
            className={`  text-right absolute right-0 left-auto mt-2 w-48 max-w-[90vw] bg-white rounded-xl shadow-lg p-4  z-30 transition-all duration-200 origin-top
              max-lg:block lg:hidden
              ${
                showFloating
                  ? "scale-y-100 opacity-100 pointer-events-auto"
                  : "scale-y-95 opacity-0 pointer-events-none"
              }
            `}
            style={{ top: "100%" }}
          >
            <h3 className="text-lg font-semibold mb-1">{userData.name}</h3>
            <hr className=" text-gray-400" />
            <p className="text-gray-500 text-sm">{userData.accountType}</p>
          </div>
        </div>
        <h3 className="text-xl font-semibold max-lg:hidden">{userData.name}</h3>
        <p className="text-gray-500 text-sm max-lg:hidden">
          {userData.accountType}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
