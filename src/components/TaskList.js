import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

function TaskList({ tasks, setTasks }) {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ text: "", description: "", date: "", priority: "low" });
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [setTasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.text.trim() !== "") {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false }]);
      setNewTask({ text: "", description: "", date: "", priority: "low" });
      setShowModal(false);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">Task List</h2>

      {/* Search bar, filter, and add task button */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-2/3 lg:w-1/2"
        />

        {/* Filter dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded bg-white border dark:bg-gray-800 dark:text-gray-100 w-32"
        >
          <option value="all">All</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      {/* Add Task button */}
      <div className="mb-4 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition"
        >
          Add Task
        </button>
      </div>

      {/* Task Cards */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all ${task.priority === "high"
                ? "bg-red-100"
                : task.priority === "medium"
                  ? "bg-yellow-100"
                  : "bg-green-100"
                }`}
            >
              <h3 className="text-xl font-bold">{task.text}</h3>
              <p>{task.description}</p>
              <p className="text-sm mt-2">Due: {task.date || "No date"}</p>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/tasks/${task.id}`}
                  className="bg-white text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks available. Add one!</p>
      )}

      {/* Modal for adding a new task */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.text}
              onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              className="border p-2 w-full rounded mb-4 text-gray-800"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border p-2 w-full rounded mb-4 text-gray-800"
            ></textarea>
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="border p-2 w-full rounded mb-4 text-gray-800"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="border p-2 w-full rounded mb-4 text-gray-800"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
