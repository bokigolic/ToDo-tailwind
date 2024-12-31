import { useState } from 'react';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Filtrira zadatke osim onog koji želimo obrisati
    setTasks(updatedTasks); // Ažurira listu
  };

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800">Moja To-Do Lista</h1>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          className="border p-2 rounded w-64"
          value={newTask}
          onChange={handleChange}
          placeholder="Unesite novi zadatak"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addTask}
        >
          Dodaj
        </button>
      </div>
      <div className="mt-4 w-full max-w-sm">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded shadow mb-2 flex justify-between"
          >
            <span>{task}</span>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500 hover:text-red-700"
            >
              Obriši
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
