import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleAddTask = () => {
    if (newTaskText) {
      fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTaskText }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks([...tasks, data]);
          setNewTaskText('');
        });
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
  {tasks.map((task) => (
    <li key={task._id}>{task.text}</li>
  ))}
</ul>
    </div>
  );
}

export default App;
