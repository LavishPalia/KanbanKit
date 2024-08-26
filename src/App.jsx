import React, { useState } from "react";
import TaskBoard from "./components/TaskBoard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { TASKBOARDS } from "./data.js";

const App = () => {
  const [taskBoards, setTaskBoards] = useState(
    JSON.parse(localStorage.getItem("taskboards")) || []
  );

  const [newTaskBoardTitle, setNewTaskBoardTitle] = useState("");
  const [addingNewList, setAddingNewList] = useState(false);

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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-boards" direction="horizontal" type="board">
        {(provided) => (
          <div
            className="flex flex-col w-full md:flex md:flex-row md:items-start gap-8 px-8 mt-16"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {taskBoards.map((taskBoard, index) => {
              const { heading, todos, id } = taskBoard;
              return (
                <Draggable draggableId={id} index={index} key={id}>
                  {(provided) => (
                    <div
                      className="px-4 py-8 rounded-2xl bg-[#001422] text-white w-80 max-w-sm"
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
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}

            {addingNewList === true ? (
              <div className="px-4 py-8 rounded-lg bg-[#001422] text-white max-w-80">
                <input
                  type="text"
                  value={newTaskBoardTitle}
                  onChange={(e) => setNewTaskBoardTitle(e.target.value)}
                  placeholder="Enter list name..."
                  className="block w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-black text-white"
                />
                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                    onClick={handleAddTaskBoard}
                    disabled={newTaskBoardTitle === ""}
                  >
                    Add list
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setAddingNewList(false)}
                  >
                    Discard
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-gray-100/30 px-6 py-2 rounded-xl text-xl flex justify-center items-center gap-2 flex-wrap w-max"
                onClick={() => setAddingNewList(true)}
              >
                <span className="text-2xl">+</span>
                <p>
                  {taskBoards.length === 0 ? "Add a list" : "Add another list"}
                </p>
              </button>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
