import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TaskTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("https://task-management-backend-ten-flame.vercel.app/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(tasks);
    const [movedTask] = items.splice(source.index, 1);
    movedTask.category = destination.droppableId;
    items.splice(destination.index, 0, movedTask);

    try {
      await axios.put(`https://task-management-backend-ten-flame.vercel.app
/tasks/${movedTask._id}`, movedTask);
      setTasks(items);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-5 min-h-screen mt-20">
      <h1 className="text-3xl font-bold text-center mb-5">Task Table</h1>

      <div className="overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <table className="w-full table-auto bg-white border border-gray-300">
            <thead>
              <tr className="bg-black text-white">
                <th className="border px-6 py-3 text-center">Title</th>
                <th className="border px-6 py-3 text-center">Description</th>
                <th className="border px-6 py-3 text-center">Category</th>
              </tr>
            </thead>
            <Droppable droppableId="taskTable" type="TASK" direction="vertical">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="hover:bg-gray-100">
                          <td className="border px-4 py-2 text-center">{task.title}</td>
                          <td className="border px-4 py-2 text-center">{task.description}</td>
                          <td className="border px-4 py-2 text-center">{task.category}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </div>
  );
}

export default TaskTable;
