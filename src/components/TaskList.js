import React, { useState } from "react";
import { Link } from "react-router-dom";

function TaskList({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState({ text: "", description: "", date: "", priority: "low" });
  const [showModal, setShowModal] = useState(false);

  const addTask = () => {
    if (newTask.text.trim() !== "") {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false }]);
      setNewTask({ text: "", description: "", date: "", priority: "low" });
      setShowModal(false);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">Task List</h2>
      <div className="mb-4">
        <p className="text-lg">Completed Tasks: {completedTasks}/{tasks.length}</p>
        <div className="bg-gray-300 w-full h-2 rounded">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition ${task.priority === "high"
                ? "border-2 border-red-500"
                : task.priority === "medium"
                  ? "border-2 border-yellow-500"
                  : "border-2 border-green-500"
              }`}
          >
            <h3 className="text-2xl font-bold">{task.text}</h3>
            <p>{task.description}</p>
            <p className="text-sm">Due: {task.date || "No date"}</p>
            <p
              className={`text-sm ${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-green-500"
                }`}
            >
              Priority: {task.priority}
            </p>
            <Link
              to={`/tasks/${task.id}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition block mx-auto"
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
