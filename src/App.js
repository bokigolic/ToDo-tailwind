import { useState } from 'react';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    console.log("Novi zadatak je: ", newTask)
    setNewTask("")
  }
  const handleChange = (e) => {
    setNewTask(e.target.value)
  }
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800">Moja To-Do Lista</h1>
      <div className="flex gap-2 mt-4">
        <input
          type='text'
          className='border p-2 rounded w-64'
          value={newTask}
          onChange={handleChange}
          placeholder='Unesite novi zadatak'
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={addTask}>Dodaj</button>
      </div>
    </div>
  );
}

export default App;

