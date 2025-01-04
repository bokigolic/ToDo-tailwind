import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TaskList({ tasks, setTasks }) {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    id: null,
    text: "",
    description: "",
    date: "",
    priority: "low",
    category: "General",
    file: null,
  });
  const [categories, setCategories] = useState(["Work", "Personal", "Shopping", "General"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const handleAddOrEditTask = () => {
    if (newTask.text.trim() === "") return;

    if (newTask.id) {
      setTasks(tasks.map((task) => (task.id === newTask.id ? newTask : task)));
    } else {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    }

    setShowModal(false);
    setNewTask({ id: null, text: "", description: "", date: "", priority: "low", category: "General", file: null });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || task.category === selectedCategory)
  );

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Task List
      </h2>

      {/* Search, Category Filter, and Add Task */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-purple-400 transition"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-lg bg-white border shadow-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddCategory}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform shadow-md transition-all"
        >
          Add Category
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform shadow-md transition-all"
        >
          Add New Task
        </button>
      </div>

      {/* Task Cards */}
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            className="p-6 mb-4 rounded-xl shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{task.text}</h3>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full shadow ${task.priority === "low"
                  ? "bg-green-200 text-green-900"
                  : task.priority === "medium"
                    ? "bg-yellow-200 text-yellow-900"
                    : "bg-red-200 text-red-900"
                  }`}
              >
                {task.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-700 italic mb-4">{task.description}</p>
            {task.file && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">Attached File:</p>
                <a
                  href={URL.createObjectURL(task.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View File
                </a>
              </div>
            )}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span className="font-medium">Due: {task.date || "No date"}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full shadow">
                {task.category}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setNewTask(task);
                  setShowModal(true);
                }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg hover:scale-105 transform transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg hover:scale-105 transform transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Modal for Adding/Editing Task */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">{newTask.id ? "Edit Task" : "Add New Task"}</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.text}
              onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              className="border p-3 w-full rounded-lg shadow-md mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border p-3 w-full rounded-lg shadow-md mb-4 focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="border p-3 w-full rounded-lg shadow-md mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="border p-3 w-full rounded-lg shadow-md mb-4 focus:ring-2 focus:ring-blue-400"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={newTask.category || ""}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              className="border p-3 w-full rounded-lg shadow-md mb-4 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={(e) => setNewTask({ ...newTask, file: e.target.files[0] })}
              className="border p-3 w-full rounded-lg shadow-md mb-4"
            />
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOrEditTask}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transform transition"
            >
              Save
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
