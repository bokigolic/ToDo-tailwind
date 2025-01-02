import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TaskList({ tasks, setTasks }) {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    text: "",
    description: "",
    date: "",
    priority: "low",
    category: "",
    file: null,
  });
  const [archivedTasks, setArchivedTasks] = useState(() => {
    const savedArchivedTasks = localStorage.getItem("archivedTasks");
    return savedArchivedTasks ? JSON.parse(savedArchivedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["Work", "Personal", "Shopping"]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [setTasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  const addTask = () => {
    if (newTask.text.trim() !== "") {
      const updatedTask = { ...newTask, id: tasks.length + 1 };
      setTasks([...tasks, updatedTask]);
      setNewTask({ text: "", description: "", date: "", priority: "low", category: "", file: null });
      setShowModal(false);
    }
  };

  const archiveTask = (id) => {
    const taskToArchive = tasks.find((task) => task.id === id);
    if (taskToArchive) {
      setArchivedTasks([...archivedTasks, taskToArchive]);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const removeCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  const filteredTasks = showArchived
    ? archivedTasks.filter(
      (task) =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || task.category === selectedCategory)
    )
    : tasks.filter(
      (task) =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || task.category === selectedCategory)
    );

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">
        {showArchived ? "Archived Tasks" : "Task List"}
      </h2>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-2/3 lg:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded bg-white border dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {showArchived ? "View Active Tasks" : "View Archived Tasks"}
        </button>
      </div>

      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add New Category"
          className="border p-2 rounded"
        />
        <button
          onClick={() => {
            if (newCategory.trim() && !categories.includes(newCategory)) {
              setCategories([...categories, newCategory]);
              setNewCategory("");
            }
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Category
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-gray-200 px-4 py-2 rounded-lg flex items-center justify-between"
          >
            <span>{category}</span>
            {!["Work", "Personal", "Shopping"].includes(category) && (
              <button
                onClick={() => removeCategory(category)}
                className="text-red-500 ml-2"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

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
                  onClick={() => archiveTask(task.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No {showArchived ? "archived" : "active"} tasks available.
        </p>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition mt-6 block mx-auto"
      >
        Add Task
      </button>

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
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
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
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="border p-2 w-full rounded mb-4 text-gray-800"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={newTask.category || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
              className="border p-2 w-full rounded mb-4 text-gray-800"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={(e) =>
                setNewTask({ ...newTask, file: e.target.files[0] })
              }
              className="border p-2 w-full rounded mb-4"
            />
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
