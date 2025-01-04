import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import PasswordManager from "./components/PasswordManager";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Sample Task 1", description: "Description for task 1", date: "2023-12-01", priority: "low", completed: false },
    { id: 2, text: "Sample Task 2", description: "Description for task 2", date: "2023-12-05", priority: "medium", completed: false },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState(() => (JSON.parse(localStorage.getItem("darkMode")) ? "dark" : "light"));

  useEffect(() => {
    // Primeni temu na `body`
    document.body.className = theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800";
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/tasks"
              element={
                isAuthenticated ? (
                  <TaskList tasks={tasks} setTasks={setTasks} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/tasks/:id"
              element={
                isAuthenticated ? (
                  <TaskDetails tasks={tasks} setTasks={setTasks} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard tasks={tasks} /> : <Navigate to="/" />}
            />
            <Route
              path="/passwords"
              element={isAuthenticated ? <PasswordManager /> : <Navigate to="/" />}
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? <Settings setTheme={setTheme} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
