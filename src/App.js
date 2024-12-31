import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import "./animations.css";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false, id: Date.now() }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const nodeRefs = useRef(new Map());

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen flex flex-col items-center p-6 text-white">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">Moja To-Do Lista</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 shadow"
            value={newTask}
            onChange={handleChange}
            placeholder="Unesite novi zadatak"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition shadow"
          >
            Dodaj
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <p className="text-gray-200">
            Ukupno zadataka: {tasks.length}, Završeni:{" "}
            {tasks.filter((task) => task.completed).length}
          </p>
          <div className="flex gap-2">
            {["all", "completed", "incomplete"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-md ${filter === type
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-purple-300 text-purple-800 hover:bg-purple-400"
                  } transition`}
              >
                {type === "all" ? "Svi" : type === "completed" ? "Završeni" : "Nezavršeni"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md">
        <TransitionGroup>
          {filteredTasks.map((task) => {
            if (!nodeRefs.current.has(task.id)) {
              nodeRefs.current.set(task.id, React.createRef());
            }
            return (
              <CSSTransition
                key={task.id}
                nodeRef={nodeRefs.current.get(task.id)}
                timeout={500}
                classNames="task"
              >
                <div
                  ref={nodeRefs.current.get(task.id)}
                  className={`flex justify-between items-center bg-white p-3 rounded-md shadow-lg mb-3 transition transform ${task.completed
                    ? "line-through text-gray-500 scale-95"
                    : "text-gray-800"
                    }`}
                >
                  <span
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="cursor-pointer flex-grow"
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Obriši
                  </button>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>

      <button
        onClick={clearTasks}
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition mt-6 shadow-lg"
      >
        Obriši sve
      </button>
    </div>
  );
}

export default App;
