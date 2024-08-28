import React, { useEffect, useRef, useState } from "react";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";
import Modal from "./Modal";
import TaskDetail from "./TaskDetail";

const TaskBoard = ({
  heading,
  todos,
  boardId,
  addNewTask,
  removeTodo,
  editTodo,
  onUpdateSubtasks,
  onUpdateBoardTitle,
  onDeleteBoard,
  disableDragOnModal,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updatedTaskBoardTitle, setUpdatedTaskBoardTitle] = useState("");

  const inputRef = useRef(null);
  const boardTitleInputRef = useRef(null);

  useEffect(() => {
    if (isEditingTitle && boardTitleInputRef.current) {
      boardTitleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  const handleAddTask = () => {
    const task = {
      id: self.crypto.randomUUID(),
      title: newTask,
      subtasks: [],
    };
    addNewTask(boardId, task);

    setNewTask("");

    //TODO: check for setIsAdding(false)
  };

  const handleDiscard = () => {
    setIsAdding(false);
  };
  const handleAddCardClick = () => {
    setIsAdding(true);
  };

  const openModal = (task) => {
    setIsModalOpen(true);
    setCurrentTask(task);
    disableDragOnModal(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
    disableDragOnModal(false);
  };

  const handleSubtaskUpdate = (updatedSubtasks) => {
    onUpdateSubtasks(boardId, currentTask.id, updatedSubtasks);
  };

  const handleEditTask = (editText, todoId) => {
    editTodo(boardId, editText, todoId);
  };

  const handleRemoveTask = (todoId) => {
    removeTodo(boardId, todoId);
  };

  const handleBoardTitleUpdate = (e) => {
    if (e.key === "Enter") {
      onUpdateBoardTitle(boardId, updatedTaskBoardTitle);
      setIsEditingTitle(false);
    }

    if (e.key === "Escape") {
      setIsEditingTitle(false);
    }
  };

  const handleDeleteBoard = () => {
    onDeleteBoard(boardId);
  };

  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {isEditingTitle === true ? (
            <input
              type="text"
              name="Board Title"
              id="editboardtitle"
              ref={boardTitleInputRef}
              value={updatedTaskBoardTitle}
              onChange={(e) => setUpdatedTaskBoardTitle(e.target.value)}
              onKeyDown={handleBoardTitleUpdate}
              className="w-full flex-1 px-4 py-2 mb-3 border rounded-md border-none focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#22272B] text-white"
            />
          ) : (
            <div className="flex items-start justify-between relative">
              <p
                className="mb-4 text-2xl cursor-pointer max-w-44 w-full tracking-tight"
                onClick={() => {
                  setUpdatedTaskBoardTitle(heading);
                  setIsEditingTitle(true);
                }}
              >
                {heading}
              </p>
              <button
                className="text-[12px] text-red-500 hover:scale-105 mb-4 transition-all"
                onClick={handleDeleteBoard}
              >
                Delete Board
              </button>
            </div>
          )}
          <TaskList
            todos={todos}
            removeTodo={handleRemoveTask}
            editTodo={handleEditTask}
            onTitleClick={openModal}
          />
          {isAdding ? (
            <div className="mt-4">
              <input
                ref={inputRef}
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task..."
                className="block w-full px-4 py-2 mb-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-black text-white"
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
              className="text-xl mt-2 bg-slate-900 font-medium px-6 py-2 rounded-md"
              onClick={handleAddCardClick}
            >
              <span className="text-2xl">+</span> &nbsp;Add a Card
            </button>
          )}
          {provided.placeholder}

          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <TaskDetail
                task={currentTask}
                boardTitle={heading}
                onClose={closeModal}
                onSubtaskUpdate={handleSubtaskUpdate}
              />
            </Modal>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default TaskBoard;
