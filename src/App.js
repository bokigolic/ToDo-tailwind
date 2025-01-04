import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import PasswordManager from "./components/PasswordManager";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Sample Task 1", description: "Description for task 1", date: "2023-12-01", priority: "low", completed: false },
    { id: 2, text: "Sample Task 2", description: "Description for task 2", date: "2023-12-05", priority: "medium", completed: false },
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        {/* Modern Navbar */}
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        {/* Routes */}
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
            path="/passwords"
            element={
              isAuthenticated ? <PasswordManager /> : <Navigate to="/" />
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? <Settings /> : <Navigate to="/" />
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
    </BrowserRouter>
  );
}

export default App;
