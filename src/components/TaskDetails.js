import React, { useState } from "react";

function TaskList({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
      setTasks([...tasks, { id: newId, text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">Task List</h2>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task..."
        className="border p-2 rounded w-full"
      />
      <button onClick={addTask} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mt-4">
        Add Task
      </button>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {tasks.map((task) => (
            <div key={task.id} className="p-6 rounded-xl shadow-lg bg-gray-100">
              <h3 className="text-xl font-bold">{task.text}</h3>
              <button onClick={() => deleteTask(task.id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No tasks available.</p>
      )}
    </div>
  );
}

export default TaskList;
