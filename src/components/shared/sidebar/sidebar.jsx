import React, { useState, useEffect } from "react";
import {
  Home,
  CreditCard,
  BarChart2,
  Landmark,
  User,
  Settings,
  Menu,
  X,
  History,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    {
      icon: <Home size={isMobile ? 20 : 24} />,
      route: "/",
      active: true,
      label: "Home",
    },
    {
      icon: <History size={isMobile ? 20 : 24} />,
      route: "/transactions",
      label: "transactions history",
    },
    {
      icon: <BarChart2 size={isMobile ? 20 : 24} />,
      route: "/statistics",
      label: "stats",
    },
  ];

  // Mobile toggle button
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Dynamic classes for responsive sidebar
  const sidebarClasses = `
    ${
      isMobile
        ? `fixed z-40 transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`
        : "relative"
    } 
    h-screen bg-white flex flex-col items-center justify-between
    ${isMobile ? "w-[240px] shadow-lg" : "w-auto p-4"}
  `;

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-600"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        {/* Top logo */}
        <div className={`${isMobile ? "mt-12" : "mt-4"}`}>
          <Link to="/" onClick={() => isMobile && setIsOpen(false)}>
            {!isMobile && (
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-1 mb-1 bg-white"></div>
                  <div className="w-6 h-1 bg-white"></div>
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation icons */}
        <div className="flex flex-col justify-start  space-y-6 md:space-y-8">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.route}
              onClick={() => isMobile && setIsOpen(false)}
              className={`p-2 rounded-lg transition-colors flex items-center ${
                item.active
                  ? "bg-lime-200 text-lime-600"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {isMobile && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </div>

        {/* Bottom icons */}
        <div className="flex flex-col space-y-4 md:space-y-6 mb-8">
          <Link
            to="/settings"
            onClick={() => isMobile && setIsOpen(false)}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg flex items-center"
          >
            <Settings size={isMobile ? 20 : 24} />
            {isMobile && (
              <span className="ml-3 text-sm font-medium">Settings</span>
            )}
          </Link>
          <Link
            to="/profile"
            onClick={() => isMobile && setIsOpen(false)}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg flex items-center"
          >
            <User size={isMobile ? 20 : 24} />
            {isMobile && (
              <span className="ml-3 text-sm font-medium">Profile</span>
            )}
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
