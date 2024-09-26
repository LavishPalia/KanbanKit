import React, { useState } from "react";
import TaskBoard from "./components/TaskBoard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { TASKBOARDS } from "./data.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [taskBoards, setTaskBoards] = useState(
    JSON.parse(localStorage.getItem("taskboards")) || []
  );

  const [newTaskBoardTitle, setNewTaskBoardTitle] = useState("");
  const [addingNewList, setAddingNewList] = useState(false);

  const [isDragDisabled, setIsDragDisabled] = useState(false);

  const handleAddTaskBoard = () => {
    const newTaskBoard = {
      id: self.crypto.randomUUID(),
      heading: newTaskBoardTitle,
      todos: [],
    };

    const updatedTaskBoards = [...taskBoards, newTaskBoard];
    setTaskBoards(updatedTaskBoards);
    localStorage.setItem("taskboards", JSON.stringify(updatedTaskBoards));
    setNewTaskBoardTitle("");
  };

  const handleDeleteTaskBoard = (boardId) => {
    const updatedTaskBoards = taskBoards.filter(
      (taskBoard) => taskBoard.id != boardId
    );

    setTaskBoards(updatedTaskBoards);
    localStorage.setItem("taskboards", JSON.stringify(updatedTaskBoards));
  };

  const onUpdateBoardTitle = (boardId, newTitle) => {
    const updatedBoards = taskBoards.map((taskBoard) =>
      taskBoard.id === boardId ? { ...taskBoard, heading: newTitle } : taskBoard
    );
    setTaskBoards(updatedBoards);
    localStorage.setItem("taskboards", JSON.stringify(updatedBoards));
  };

  const handleUpdateSubtasks = (boardId, taskId, updatedSubtasks) => {
    const updatedBoards = taskBoards.map((taskBoard) => {
      if (taskBoard.id === boardId) {
        const updatedTodos = taskBoard.todos.map((task) => {
          if (task.id === taskId) {
            return { ...task, subtasks: updatedSubtasks };
          }
          return task;
        });

        return { ...taskBoard, todos: updatedTodos };
      }

      return taskBoard;
    });

    setTaskBoards(updatedBoards);
    localStorage.setItem("taskboards", JSON.stringify(updatedBoards));
  };

  const addNewTask = (boardId, newTask) => {
    const updatedBoards = taskBoards.map((taskBoard) => {
      return taskBoard.id === boardId
        ? { ...taskBoard, todos: [...taskBoard.todos, newTask] }
        : taskBoard;
    });

    setTaskBoards(updatedBoards);

    localStorage.setItem("taskboards", JSON.stringify(updatedBoards));
  };

  const removeTask = (boardId, taskId) => {
    const updatedBoards = taskBoards.map((taskBoard) => {
      if (taskBoard.id === boardId) {
        const filteredTodos = taskBoard.todos.filter(
          (task) => task.id !== taskId
        );

        return {
          ...taskBoard,
          todos: filteredTodos,
        };
      }

      return taskBoard;
    });

    setTaskBoards(updatedBoards);

    localStorage.setItem("taskboards", JSON.stringify(updatedBoards));
  };

  const editTask = (boardId, taskTitle, taskId) => {
    const updatedBoards = taskBoards.map((taskBoard) => {
      if (taskBoard.id === boardId) {
        const updatedTodos = taskBoard.todos.map((task) =>
          task.id === taskId ? { ...task, title: taskTitle } : task
        );

        return {
          ...taskBoard,
          todos: updatedTodos,
        };
      }

      return taskBoard;
    });

    setTaskBoards(updatedBoards);

    localStorage.setItem("taskboards", JSON.stringify(updatedBoards));
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "board") {
      const updatedTaskBoards = Array.from(taskBoards);
      const [movedBoard] = updatedTaskBoards.splice(source.index, 1);
      updatedTaskBoards.splice(destination.index, 0, movedBoard);

      setTaskBoards(updatedTaskBoards);
      localStorage.setItem("taskboards", JSON.stringify(updatedTaskBoards));
    } else {
      const sourceBoardIndex = taskBoards.findIndex(
        (board) => board.id === source.droppableId
      );
      const destinationBoardIndex = taskBoards.findIndex(
        (board) => board.id === destination.droppableId
      );

      const sourceBoard = taskBoards[sourceBoardIndex];
      const destinationBoard = taskBoards[destinationBoardIndex];

      const [movedTask] = sourceBoard.todos.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceBoard.todos.splice(destination.index, 0, movedTask);
      } else {
        destinationBoard.todos.splice(destination.index, 0, movedTask);
      }

      const updatedBoards = [...taskBoards];
      updatedBoards[sourceBoardIndex] = sourceBoard;
      updatedBoards[destinationBoardIndex] = destinationBoard;

      setTaskBoards(updatedBoards);
      localStorage.setItem("taskboards", JSON.stringify(updatedBoards));
    }
  };

  const disableDragOnModal = (isOpen) => {
    setIsDragDisabled(isOpen);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header />
      <Droppable droppableId="all-boards" direction="horizontal" type="board">
        {(provided) => (
          <div
            className="flex overflow-x-scroll flex-col gap-8 px-8 mt-12 w-full min-h-screen md:flex md:flex-row md:items-start"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {taskBoards.map((taskBoard, index) => {
              const { heading, todos, id } = taskBoard;
              return (
                <Draggable
                  draggableId={id}
                  index={index}
                  key={id}
                  isDragDisabled={isDragDisabled}
                >
                  {(provided) => (
                    <div
                      className="px-3 py-3 rounded-lg bg-[#001422] text-white min-w-80 max-w-sm"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskBoard
                        heading={heading}
                        boardId={id}
                        todos={todos}
                        addNewTask={addNewTask}
                        removeTodo={removeTask}
                        editTodo={editTask}
                        onUpdateSubtasks={handleUpdateSubtasks}
                        onUpdateBoardTitle={onUpdateBoardTitle}
                        onDeleteBoard={handleDeleteTaskBoard}
                        disableDragOnModal={disableDragOnModal}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}

            {addingNewList === true ? (
              <div className="px-2 py-4 rounded-lg bg-[#001422] text-white min-w-80">
                <input
                  type="text"
                  value={newTaskBoardTitle}
                  onChange={(e) => setNewTaskBoardTitle(e.target.value)}
                  placeholder="Enter list name..."
                  className="block px-4 py-2 mb-2 w-full text-white bg-black rounded-sm border-0 focus:border-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="flex gap-4 mt-1">
                  <button
                    className="px-4 py-2 text-white bg-indigo-500 rounded-sm"
                    onClick={handleAddTaskBoard}
                    disabled={newTaskBoardTitle === ""}
                  >
                    Add list
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded-sm"
                    onClick={() => setAddingNewList(false)}
                  >
                    Discard
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="px-1 py-1 text-xl rounded-md min-w-52 bg-gray-100/30"
                onClick={() => setAddingNewList(true)}
              >
                <p>
                  {taskBoards.length === 0 ? "+ Add a list" : "+ Add another list"}
                </p>
              </button>
            )}
          </div>
        )}
      </Droppable>

      <Footer />
    </DragDropContext>
  );
};

export default App;
