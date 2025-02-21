import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
