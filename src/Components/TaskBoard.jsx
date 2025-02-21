import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";


function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    const updatedTask = { ...reorderedItem, category: destination.droppableId };
    await axios.put(`http://localhost:5000/tasks/${updatedTask._id}`, updatedTask);

    setTasks(items);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="App">
      <h1>Task Management</h1>
      <TaskForm onTaskAdded={(task) => setTasks([...tasks, task])} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          {['To-Do', 'In Progress', 'Done'].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    margin: 10,
                    border: "1px solid #ddd",
                    padding: 10,
                    width: "300px",
                    backgroundColor: "#f4f4f4",
                  }}
                >
                  <h2>{category}</h2>
                  {tasks.filter(task => task.category === category).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            marginBottom: 10,
                            padding: 10,
                            backgroundColor: "#fff",
                            borderRadius: 5,
                          }}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <button onClick={() => deleteTask(task._id)}>Delete</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskBoard;
