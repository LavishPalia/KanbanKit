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
          className="text-xl font-bold text-cyan-700 underline cursor-pointer underline-offset-4"
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
        <div className="p-4 mt-8 w-full max-w-xl rounded-lg bg-stone-900/90 md:w-3/5">
          <p className="text-xl tracking-wide uppercase">Subtasks</p>
          {subtasks.map((subtask) => {
            const isEditing = editingSubtaskId === subtask.id;
            return (
              <div
                className="flex gap-3 mt-1"
                key={subtask.id}
                onMouseEnter={() => setHoveredSubtaskId(subtask.id)}
                onMouseLeave={() => setHoveredSubtaskId(null)}
              >
                {isEditing ? (
                  <div className="flex flex-1 gap-2 justify-between items-center">
                    <input
                      type="text"
                      name="Edit Subtask"
                      id="editsubtask"
                      value={editedSubtask}
                      onChange={(e) => setEditedSubtask(e.target.value)}
                      className="px-4 py-2 w-full text-white bg-black rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      className="p-2 bg-gray-300 rounded-md hover:bg-gray-200"
                      onClick={() => handleEditSubtask(subtask.id)}
                    >
                      ✔️
                    </button>

                    <button
                      className="p-2 bg-gray-300 rounded-md hover:bg-gray-200"
                      onClick={() => setEditingSubtaskId(null)}
                    >
                      ✖️
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center px-2 py-1 w-full rounded-lg min-h-12 hover:bg-gray-700/75">
                    <div className="flex gap-2 justify-center items-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtaskComplete(subtask.id)}
                        className="w-6 h-14 cursor-pointer md:w-4 md:h-8"
                      />
                      <h2 className="flex-1 ml-3 text-xl md:text-lg max-w-52 md:max-w-xl">
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
            className="block px-4 py-2 mb-2 w-full text-white bg-black rounded-sm border focus:border-none max-w-96 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-4">
            <button
              className="px-2 py-1 text-white bg-indigo-500 rounded-sm transition-all delay-200 hover:bg-indigo-600 hover:scale-95"
              onClick={handleAddSubTask}
              disabled={subtask === ""}
            >
              Add Subtask
            </button>
            <button
              className="px-2 py-1 text-white bg-red-500 rounded-sm transition-all delay-200 hover:bg-red-600 hover:scale-95"
              onClick={handleDiscard}
            >
              Discard
            </button>
          </div>
        </div>
      ) : (
        <button
          className="px-3 py-1 mt-4 text-2xl font-medium rounded-sm transition-all delay-200 md:text-xl bg-slate-900 hover:bg-slate-800 hover:scale-95"
          onClick={handleAddCardClick}
        >
          + Add Subtask
        </button>
      )}
    </div>
  );
};

export default TaskDetail;
