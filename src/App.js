import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import Home from "./components/Home";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import Contact from "./components/Contact";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Call Elon", description: "Discuss Tesla updates", date: "2023-12-01", completed: false },
    { id: 2, text: "Finish dribble", description: "Work on new designs", date: "2023-12-05", completed: false },
  ]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
        <nav className="p-4 bg-gray-800 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/">ToDo App</Link>
          </h1>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/tasks" className="hover:underline">Tasks</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList tasks={tasks} setTasks={setTasks} />} />
          <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} setTasks={setTasks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;