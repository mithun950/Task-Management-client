import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


// Toastify Configuration


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

      // 🎉 Show success toast
      toast.success("Task added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-8  bg-white shadow-2xl rounded-2xl border border-gray-300">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">📝 Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          maxLength="50"
          placeholder="Task Title"
          className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-sm text-lg placeholder-gray-500"
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          maxLength="200"
          placeholder="Task Description"
          className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-sm text-lg placeholder-gray-500 resize-none"
          rows="4"
        />
        <select
          name="category"
          value={task.category}
          onChange={handleChange}
          className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-sm text-lg"
        >
          <option value="To-Do">📝 To-Do</option>
          <option value="In Progress">⏳ In Progress</option>
          <option value="Done">✅ Done</option>
        </select>
        <button
          type="submit"
          className="w-full bg-gray-800 cursor-pointer text-white font-semibold py-3 rounded-lg text-lg transition-all duration-300 shadow-md transform hover:scale-105"
        >
          ➕ Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
