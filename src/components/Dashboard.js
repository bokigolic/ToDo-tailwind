import React from "react";

function Dashboard({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;
  const highPriorityTasks = tasks.filter((task) => task.priority === "high").length;

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">Completed Tasks</h2>
          <p className="text-4xl font-bold">{completedTasks}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">Active Tasks</h2>
          <p className="text-4xl font-bold">{activeTasks}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">High Priority</h2>
          <p className="text-4xl font-bold">{highPriorityTasks}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
