import React from "react";

function Dashboard({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold">Active Tasks</h2>
          <p className="text-4xl font-bold mt-4">{activeTasks}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold">Completed Tasks</h2>
          <p className="text-4xl font-bold mt-4">{completedTasks}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
