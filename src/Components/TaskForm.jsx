import React, { useState } from "react";
import axios from "axios";

function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/tasks", task);
      onTaskAdded(response.data);
      setTask({ title: "", description: "", category: "To-Do" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        required
        maxLength="50"
        placeholder="Task Title"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        maxLength="200"
        placeholder="Task Description"
      />
      <select
        name="category"
        value={task.category}
        onChange={handleChange}
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
