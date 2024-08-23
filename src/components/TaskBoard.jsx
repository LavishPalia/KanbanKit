import React, { useRef, useState } from "react";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";

const TaskBoard = ({
  heading,
  todos,
  addNewTask,
  category,
  removeTodo,
  editTodo,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  const handleAddTask = () => {
    console.log("ran");

    const task = {
      id: self.crypto.randomUUID(),
      title: newTask,
      category: category,
    };
    addNewTask(category, task);

    setNewTask("");

    //TODO: check for setIsAdding(false)
  };

  const handleDiscard = () => {
    setIsAdding(false);
  };
  const handleAddCardClick = () => {
    setIsAdding(true);
  };

  return (
    <Droppable droppableId={category}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <p className="mb-4 text-2xl">{heading}</p>
          <TaskList todos={todos} removeTodo={removeTodo} editTodo={editTodo} />
          {isAdding ? (
            <div className="mt-4">
              <input
                ref={inputRef}
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task..."
                className="block w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-black text-white"
              />
              <div className="flex gap-4">
                <button
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                  onClick={handleAddTask}
                  disabled={newTask === ""}
                >
                  Add Card
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={handleDiscard}
                >
                  Discard
                </button>
              </div>
            </div>
          ) : (
            <button
              className="text-xl mt-4 bg-slate-900 font-medium px-6 py-2 rounded-md"
              onClick={handleAddCardClick}
            >
              <span className="text-2xl">+</span> &nbsp;Add a Card
            </button>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskBoard;
