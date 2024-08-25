import React, { useState } from "react";
import TaskBoard from "./components/TaskBoard";
import { DragDropContext } from "react-beautiful-dnd";

const TODO_TASKS = [
  {
    id: self.crypto.randomUUID(),
    title: "Implement Drag and Drop for Trello Cards",
    category: "TODOS",
    subtasks: [],
  },
  {
    id: self.crypto.randomUUID(),
    title: "Refactor Components for Reusability",
    category: "TODOS",
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
  {
    id: self.crypto.randomUUID(),
    title: "Integrate Redux for State Management",
    category: "TODOS",
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: "Create vite application",
        completed: false,
      },
    ],
  },
];

const IN_PROGRESS_TASKS = [
  {
    id: self.crypto.randomUUID(),
    title: "Create Trello Frontend",
    category: "INPROGRESS",
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: "Create vite application",
        completed: false,
      },
    ],
  },
  {
    id: self.crypto.randomUUID(),
    title: "Design data flow between components",
    category: "INPROGRESS",
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
  {
    id: self.crypto.randomUUID(),
    title: "Setup Context to avoid Prop drilling",
    category: "INPROGRESS",
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
];

const DONE_TASKS = [
  {
    id: self.crypto.randomUUID(),
    title: "Setup Initial Project Structure",
    category: "DONE",
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
  {
    id: self.crypto.randomUUID(),
    title: "Create Reusable Button Component",
    category: "DONE",
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: "Create vite application",
        completed: false,
      },
    ],
  },
  {
    id: self.crypto.randomUUID(),
    title: "Configure Webpack and Babel for Development",
    category: "DONE",
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
];

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [inProgress, setInProgess] = useState(
    JSON.parse(localStorage.getItem("inprogress")) || []
  );
  const [done, setDone] = useState(
    JSON.parse(localStorage.getItem("done")) || []
  );

  const handleUpdateSubtasks = (taskCategory, taskId, updatedSubtasks) => {
    let updatedTasks = [];

    switch (taskCategory) {
      case "TODOS":
        updatedTasks = todos.map((task) =>
          task.id === taskId ? { ...task, subtasks: updatedSubtasks } : task
        );
        setTodos(updatedTasks);
        // Persist to local storage
        localStorage.setItem("todos", JSON.stringify(updatedTasks));
        break;
      case "INPROGRESS":
        updatedTasks = inProgress.map((task) =>
          task.id === taskId ? { ...task, subtasks: updatedSubtasks } : task
        );
        setInProgess(updatedTasks);
        // Persist to local storage
        localStorage.setItem("inprogress", JSON.stringify(updatedTasks));
        break;
      case "DONE":
        updatedTasks = done.map((task) =>
          task.id === taskId ? { ...task, subtasks: updatedSubtasks } : task
        );
        setDone(updatedTasks);
        // Persist to local storage
        localStorage.setItem("done", JSON.stringify(updatedTasks));
        break;
      default:
        break;
    }
  };

  const addNewTask = (category, task) => {
    let updatedTasks;
    switch (category) {
      case "TODOS":
        updatedTasks = [...todos, task];
        setTodos(updatedTasks);
        localStorage.setItem("todos", JSON.stringify(updatedTasks));
        break;
      case "INPROGRESS":
        updatedTasks = [...inProgress, task];
        setInProgess(updatedTasks);
        localStorage.setItem("inprogress", JSON.stringify(updatedTasks));
        break;
      case "DONE":
        updatedTasks = [...done, task];
        setDone(updatedTasks);
        localStorage.setItem("done", JSON.stringify(updatedTasks));
        break;
      default:
        break;
    }
  };

  const removeTask = (category, taskId) => {
    let filteredTasks;
    switch (category) {
      case "TODOS":
        filteredTasks = todos.filter((todo) => todo.id !== taskId);
        setTodos(filteredTasks);
        localStorage.setItem("todos", JSON.stringify(filteredTasks));
        break;
      case "INPROGRESS":
        filteredTasks = inProgress.filter((todo) => todo.id !== taskId);
        setInProgess(filteredTasks);
        localStorage.setItem("inprogress", JSON.stringify(filteredTasks));
        break;
      case "DONE":
        filteredTasks = done.filter((todo) => todo.id !== taskId);
        setDone(filteredTasks);
        localStorage.setItem("done", JSON.stringify(filteredTasks));
        break;
      default:
        break;
    }
  };

  const editTask = (category, taskTitle, taskId) => {
    let updatedTasks;
    switch (category) {
      case "TODOS":
        updatedTasks = todos.map((todo) =>
          todo.id === taskId ? { ...todo, title: taskTitle } : todo
        );
        setTodos(updatedTasks);
        localStorage.setItem("todos", JSON.stringify(updatedTasks));
        break;
      case "INPROGRESS":
        updatedTasks = inProgress.map((todo) =>
          todo.id === taskId ? { ...todo, title: taskTitle } : todo
        );
        setInProgess(updatedTasks);
        localStorage.setItem("inprogress", JSON.stringify(updatedTasks));
        break;
      case "DONE":
        updatedTasks = done.map((todo) =>
          todo.id === taskId ? { ...todo, title: taskTitle } : todo
        );
        setDone(updatedTasks);
        localStorage.setItem("done", JSON.stringify(updatedTasks));
        break;
      default:
        break;
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let sourceTasks, setSourceTasks, destinationTasks, setDestinationTasks;
    switch (source.droppableId) {
      case "TODOS":
        sourceTasks = todos;
        setSourceTasks = setTodos;
        break;
      case "INPROGRESS":
        sourceTasks = inProgress;
        setSourceTasks = setInProgess;
        break;
      case "DONE":
        sourceTasks = done;
        setSourceTasks = setDone;
        break;
      default:
        break;
    }

    switch (destination.droppableId) {
      case "TODOS":
        destinationTasks = todos;
        setDestinationTasks = setTodos;
        break;
      case "INPROGRESS":
        destinationTasks = inProgress;
        setDestinationTasks = setInProgess;
        break;
      case "DONE":
        destinationTasks = done;
        setDestinationTasks = setDone;
        break;
      default:
        break;
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = Array.from(sourceTasks);
      const [movedTask] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, movedTask);
      setSourceTasks(reorderedTasks);
      localStorage.setItem(
        source.droppableId.toLowerCase(),
        JSON.stringify(reorderedTasks)
      );
    } else {
      const startTasks = Array.from(sourceTasks);
      const [movedTask] = startTasks.splice(source.index, 1);
      setSourceTasks(startTasks);
      localStorage.setItem(
        source.droppableId.toLowerCase(),
        JSON.stringify(startTasks)
      );

      // console.log(destination);
      console.log(movedTask);
      movedTask.category = destination.droppableId;
      console.log(movedTask);

      const finishTasks = Array.from(destinationTasks);
      finishTasks.splice(destination.index, 0, movedTask);
      setDestinationTasks(finishTasks);
      localStorage.setItem(
        destination.droppableId.toLowerCase(),
        JSON.stringify(finishTasks)
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col w-full md:flex md:flex-row md:justify-between md:items-start gap-8 px-8 mt-16">
        <div className="bg-gradient-to-t from-amber-400 to-slate-800 px-4 py-8 rounded-lg flex-1">
          <TaskBoard
            heading="To do"
            todos={todos}
            addNewTask={addNewTask}
            category="TODOS"
            removeTodo={removeTask}
            editTodo={editTask}
            onUpdateSubtasks={handleUpdateSubtasks}
          />
        </div>
        <div className="bg-gradient-to-t from-indigo-400 to-slate-950 px-4 py-8 rounded-lg flex-1">
          <TaskBoard
            heading="In Progress"
            todos={inProgress}
            addNewTask={addNewTask}
            category="INPROGRESS"
            removeTodo={removeTask}
            editTodo={editTask}
            onUpdateSubtasks={handleUpdateSubtasks}
          />
        </div>
        <div className="bg-gradient-to-t from-cyan-400 to-slate-900 px-4 py-8 rounded-lg flex-1">
          <TaskBoard
            heading="Done"
            todos={done}
            addNewTask={addNewTask}
            category="DONE"
            removeTodo={removeTask}
            editTodo={editTask}
            onUpdateSubtasks={handleUpdateSubtasks}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
