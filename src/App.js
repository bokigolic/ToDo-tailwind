import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./components/Home";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import PasswordManager from "./components/PasswordManager";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Sample Task 1", description: "Description for task 1", date: "2023-12-01", priority: "low", completed: false },
    { id: 2, text: "Sample Task 2", description: "Description for task 2", date: "2023-12-05", priority: "medium", completed: false },
  ]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-800 dark:text-gray-100">
        {/* Navbar */}
        {isAuthenticated && (
          <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">ToDo App</h1>
            <div className="flex gap-4">
              <Link to="/tasks" className="nav-link">
                Tasks
              </Link>

              <Link to="/passwords" className="nav-link">
                Passwords
              </Link>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </nav>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/tasks"
            element={
              isAuthenticated ? (
                <TaskList
                  tasks={tasks}
                  setTasks={setTasks}
                  archivedTasks={archivedTasks}
                  setArchivedTasks={setArchivedTasks}
                />
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
            element={isAuthenticated ? <PasswordManager /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
