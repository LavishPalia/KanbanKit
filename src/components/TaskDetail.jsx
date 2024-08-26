import React, { useState } from "react";

const TaskDetail = ({ task, onClose, onSubtaskUpdate, boardTitle }) => {
  const { title } = task;

  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [subtask, setSubtask] = useState("");
  const [hoveredSubtaskId, setHoveredSubtaskId] = useState(null);
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editedSubtask, setEditedSubtask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleEditClick = (subtask) => {
    setEditingSubtaskId(subtask.id);
    setEditedSubtask(subtask.title);
  };

  const handleAddCardClick = () => {
    setIsAdding(true);
  };

  const handleDiscard = () => {
    setIsAdding(false);
  };

  const handleAddSubTask = () => {
    const newSubtask = {
      id: self.crypto.randomUUID(),
      title: subtask,
      completed: false,
    };

    const updatedSubtasks = [...subtasks, newSubtask];
    setSubtasks(updatedSubtasks);

    onSubtaskUpdate(updatedSubtasks);

    setSubtask("");
    setIsAdding(false);
  };

  const handleToggleSubtaskComplete = (subtaskId) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      return subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask;
    });
    setSubtasks(updatedSubtasks);

    onSubtaskUpdate(updatedSubtasks);
  };

  const handleEditSubtask = (id) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      return subtask.id === id ? { ...subtask, title: editedSubtask } : subtask;
    });

    setSubtasks(updatedSubtasks);

    onSubtaskUpdate(updatedSubtasks);

    setEditingSubtaskId(null);
  };

  const handleDeleteSubtask = (id) => {
    const updatedSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(updatedSubtasks);
    onSubtaskUpdate(updatedSubtasks);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-1">
        in list &nbsp;
        <button
          className="text-cyan-700 font-bold text-xl underline underline-offset-4 cursor-pointer"
          onClick={onClose}
        >
          {boardTitle}
        </button>
      </p>

      {subtasks.length === 0 ? (
        <div className="mt-6 text-lg font-medium tracking-wide">
          <p>📋 Add a subtask to organize your work</p>
        </div>
      ) : (
        <div className="mt-8 p-4 bg-stone-900/90 max-w-xl w-full md:w-3/5 rounded-lg">
          <p className="text-xl tracking-wide uppercase ">Subtasks</p>
          {subtasks.map((subtask) => {
            const isEditing = editingSubtaskId === subtask.id;
            return (
              <div
                className="mt-1 flex gap-3"
                key={subtask.id}
                onMouseEnter={() => setHoveredSubtaskId(subtask.id)}
                onMouseLeave={() => setHoveredSubtaskId(null)}
              >
                {isEditing ? (
                  <div className="flex justify-between items-center flex-1 gap-2">
                    <input
                      type="text"
                      name="Edit Subtask"
                      id="editsubtask"
                      value={editedSubtask}
                      onChange={(e) => setEditedSubtask(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-black text-white"
                    />
                    <button
                      className="bg-gray-300 hover:bg-gray-200 p-2 rounded-md"
                      onClick={() => handleEditSubtask(subtask.id)}
                    >
                      ✔️
                    </button>

                    <button
                      className="bg-gray-300 hover:bg-gray-200 p-2 rounded-md"
                      onClick={() => setEditingSubtaskId(null)}
                    >
                      ✖️
                    </button>
                  </div>
                ) : (
                  <div className="flex w-full min-h-12 items-center justify-between hover:bg-gray-700/75 px-2 py-1 rounded-lg">
                    <div className="flex gap-2 justify-center items-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtaskComplete(subtask.id)}
                        className="w-6 h-14 md:w-4 md:h-8 cursor-pointer"
                      />
                      <h2 className="text-xl md:text-lg flex-1 ml-3 max-w-52 md:max-w-xl">
                        {subtask.title} {subtask.completed && "🏅"}
                      </h2>
                    </div>
                    {hoveredSubtaskId === subtask.id && (
                      <div className="flex gap-2 justify-center items-center">
                        <button
                          className=" bg-gray-300 hover:bg-gray-200 p-2 rounded-md text-black md:text-[10px]"
                          onClick={() => handleEditClick(subtask)}
                        >
                          ✎
                        </button>
                        <button
                          className=" bg-gray-300 hover:bg-gray-200 p-2 rounded-md md:text-[10px]"
                          onClick={() => handleDeleteSubtask(subtask.id)}
                        >
                          ✖️
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isAdding ? (
        <div className="mt-4">
          <input
            type="text"
            value={subtask}
            onChange={(e) => setSubtask(e.target.value)}
            placeholder="Enter a subtask..."
            className="block w-full max-w-96 px-4 py-2 mb-2 border rounded-md focus:outline-none 
            focus:ring-2 focus:ring-indigo-500 bg-black text-white"
          />
          <div className="flex gap-4">
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md"
              onClick={handleAddSubTask}
              disabled={subtask === ""}
            >
              Add Subtask
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
          className="text-2xl md:text-xl mt-4 bg-slate-900 font-medium px-6 py-2 rounded-md"
          onClick={handleAddCardClick}
        >
          <span className="text-3xl md:text-2xl">+</span> &nbsp;Add Subtask
        </button>
      )}
    </div>
  );
};

export default TaskDetail;
