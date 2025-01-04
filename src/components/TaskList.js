import React, { useState, useEffect } from "react";

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
  const [sortType, setSortType] = useState("date");
  const [archivedTasks, setArchivedTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [setTasks]);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrEditTask = () => {
    if (newTask.text.trim() === "") return;
    const updatedTasks = newTask.id
      ? tasks.map((task) => (task.id === newTask.id ? newTask : task))
      : [...tasks, { ...newTask, id: tasks.length + 1 }];
    setTasks(updatedTasks);
    setShowModal(false);
    setNewTask({ id: null, text: "", description: "", date: "", priority: "low", category: "General", file: null });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleArchiveTask = (taskId) => {
    const taskToArchive = tasks.find((task) => task.id === taskId);
    setArchivedTasks([...archivedTasks, taskToArchive]);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const sortTasks = (tasks) => {
    switch (sortType) {
      case "priority":
        return [...tasks].sort((a, b) => {
          const priorities = { low: 1, medium: 2, high: 3 };
          return priorities[b.priority] - priorities[a.priority];
        });
      case "date":
        return [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return tasks;
    }
  };

  const filteredTasks = sortTasks(
    tasks.filter(
      (task) =>
        (task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "All" || task.category === selectedCategory)
    )
  );

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">Task List</h2>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded bg-white border"
        >
          <option value="All">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 rounded bg-white border"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition"
        >
          Add New Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="p-6 rounded-xl shadow-lg bg-gray-100">
            <h3 className="text-xl font-bold">{task.text}</h3>
            <p>{task.description}</p>
            <p className="text-sm mt-2">
              Due: {task.date || "No date"}, Priority: {task.priority}, Category: {task.category}
            </p>
            <button
              onClick={() => handleArchiveTask(task.id)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mt-2"
            >
              Archive
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-6">Archived Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {archivedTasks.map((task) => (
          <div key={task.id} className="p-6 rounded-xl shadow-lg bg-gray-200">
            <h3 className="text-xl font-bold">{task.text}</h3>
            <p>{task.description}</p>
            <p className="text-sm mt-2">
              Due: {task.date || "No date"}, Priority: {task.priority}, Category: {task.category}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{newTask.id ? "Edit Task" : "Add New Task"}</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.text}
              onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              className="border p-2 w-full rounded mb-4"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border p-2 w-full rounded mb-4"
            ></textarea>
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="border p-2 w-full rounded mb-4"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="border p-2 w-full rounded mb-4"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={newTask.category || ""}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              className="border p-2 w-full rounded mb-4"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOrEditTask}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
