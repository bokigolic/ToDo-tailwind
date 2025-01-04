import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegListAlt, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 shadow-lg">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaRegListAlt size={30} className="text-white" />
          <h1 className="text-2xl font-bold tracking-wider hover:scale-105 transform transition">
            ToDo App
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && (
            <>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `text-lg font-medium transition ${isActive ? "text-yellow-300 underline" : "hover:text-yellow-300"}`
                }
              >
                Tasks
              </NavLink>
              <NavLink
                to="/passwords"
                className={({ isActive }) =>
                  `text-lg font-medium transition ${isActive ? "text-yellow-300 underline" : "hover:text-yellow-300"}`
                }
              >
                Passwords
              </NavLink>
              <div className="relative group">
                <FaUserCircle size={24} className="cursor-pointer hover:text-yellow-300" />
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-4 hidden group-hover:block">
                  <p className="text-sm font-medium mb-2">Hello, User!</p>
                  <button
                    onClick={() => navigate("/settings")}
                    className="text-blue-600 hover:underline block"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-blue-600 hover:underline block mt-2"
                  >
                    Profile
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transform transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {isMobileMenuOpen ? (
            <FaTimes size={24} className="cursor-pointer" onClick={toggleMobileMenu} />
          ) : (
            <FaBars size={24} className="cursor-pointer" onClick={toggleMobileMenu} />
          )}
        </div>
      </div>

      {/* Mobile Links */}
      {isMobileMenuOpen && (
        <div className="flex flex-col bg-purple-700 text-white py-4 px-6 md:hidden">
          {isAuthenticated && (
            <>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `text-lg font-medium transition ${isActive ? "text-yellow-300 underline" : "hover:text-yellow-300"}`
                }
                onClick={toggleMobileMenu}
              >
                Tasks
              </NavLink>
              <NavLink
                to="/passwords"
                className={({ isActive }) =>
                  `text-lg font-medium transition ${isActive ? "text-yellow-300 underline" : "hover:text-yellow-300"}`
                }
                onClick={toggleMobileMenu}
              >
                Passwords
              </NavLink>
              <NavLink
                to="/settings"
                className="text-lg font-medium hover:text-yellow-300 mt-4"
                onClick={toggleMobileMenu}
              >
                Settings
              </NavLink>
              <NavLink
                to="/profile"
                className="text-lg font-medium hover:text-yellow-300 mt-4"
                onClick={toggleMobileMenu}
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  toggleMobileMenu();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md mt-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
