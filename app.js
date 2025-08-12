import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  }

  function addTask() {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input.trim(), completed: false }]);
    setInput("");
    showToast("Task added");
  }

  function toggleTask(index) {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    showToast(newTasks[index].completed ? "Task completed" : "Task uncompleted");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
    showToast("Task deleted");
  }

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="input-row">
        <input
          type="text"
          placeholder="Add a task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? "completed" : ""}
            onClick={() => toggleTask(index)}
          >
            {task.text}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(index);
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {toast && <div id="toast" className="show">{toast}</div>}
    </div>
  );
}

export default App;
