import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskList = ({ todos, removeTodo, editTodo, onTitleClick }) => {
  const [hoveredTodoId, setHoveredTodoId] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditText(todo.title);
  };

  const handleSaveEdit = (todoId) => {
    editTodo(editText, todoId);

    setEditingTodoId(null);
  };

  return (
    <div>
      {todos.map((todo, index) => {
        const isEditing = editingTodoId === todo.id;
        return (
          <Draggable key={todo.id} draggableId={todo.id} index={index}>
            {(provided) => (
              <div
                className={`flex justify-between items-center gap-4 mb-2 p-2 rounded-md md:max-w-96 min-h-12 max-h-20 ${
                  isEditing ? "bg-transparent" : "bg-slate-500"
                }`}
                onMouseEnter={() => setHoveredTodoId(todo.id)}
                onMouseLeave={() => setHoveredTodoId(null)}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {isEditing ? (
                  <div className="flex justify-between items-center gap-2">
                    <input
                      type="text"
                      name="todo"
                      id="edittodo"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full flex-1 px-4 py-2 border rounded-md border-none focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#22272B] text-white"
                    />
                    <button
                      className="bg-gray-300 hover:bg-gray-200 p-2 rounded-md"
                      onClick={() => handleSaveEdit(todo.id)}
                      disabled={editText === ""}
                    >
                      ✔️
                    </button>
                  </div>
                ) : (
                  <>
                    <h1
                      className="text-gray-900 font-semibold text-[16px] max-w-80 text-wrap cursor-pointer"
                      onClick={() => onTitleClick(todo)}
                    >
                      {todo.title}
                    </h1>
                    {hoveredTodoId === todo.id && (
                      <div className="flex">
                        <button
                          className="mr-2 bg-gray-300 hover:bg-gray-200 p-2 rounded-md text-black text-[10px]"
                          onClick={() => handleEditClick(todo)}
                        >
                          ✎
                        </button>
                        <button
                          className="mr-2 bg-gray-300 hover:bg-gray-200 p-2 rounded-md text-[10px]"
                          onClick={() => removeTodo(todo.id)}
                        >
                          ✖️
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

export default TaskList;
