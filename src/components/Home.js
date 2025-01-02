import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

function Home({ setIsAuthenticated }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (pin === config.appPinCode) {
      setIsAuthenticated(true);
      navigate("/tasks");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 text-white px-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-500">
          Welcome to ToDo App
        </h1>
        <p className="text-lg">Enter the PIN to access the application.</p>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 p-3 w-full rounded-lg text-gray-800"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
