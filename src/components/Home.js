import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

function Home() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (pin === config.pinCode) {
      navigate("/tasks");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 text-white px-4">
      <div className="text-center space-y-6 max-w-lg animate-fadeIn">
        <h1 className="text-5xl font-bold animate-bounce">Welcome to ToDo App</h1>
        <p className="text-lg animate-pulse">Stay organized and productive every day.</p>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border p-2 w-full rounded text-black"
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
