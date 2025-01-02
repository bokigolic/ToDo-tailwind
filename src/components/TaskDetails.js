import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function TaskDetails({ tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === parseInt(id));

  const deleteTask = () => {
    setTasks(tasks.filter((t) => t.id !== task.id));
    navigate("/tasks");
  };

  if (!task) {
    return <p className="text-center text-red-500">Task not found!</p>;
  }

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Task Details</h2>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{task.text}</h3>
        <p>{task.description}</p>
        <p className="text-gray-600">Due date: {task.date || "No date specified"}</p>
        <div className="flex gap-4">
          <button
            onClick={deleteTask}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
          >
            Delete Task
          </button>
          <button
            onClick={() => navigate("/tasks")}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
