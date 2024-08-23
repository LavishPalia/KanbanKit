import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskList = ({ todos, removeTodo, editTodo }) => {
  const [hoveredTodoId, setHoveredTodoId] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditText(todo.title);
  };

  const handleSaveEdit = (todo) => {
    editTodo(todo.category, editText, todo.id);

    setEditingTodoId(null);
  };

  if(todos.length === 0) {
    return <>
      <h1 className="text-2xl font-bold">📝 Start adding your first task </h1>
    </>
  }

  return (
    <div>
      {todos.map((todo, index) => {
        const isEditing = editingTodoId === todo.id;
        return (
          <Draggable key={todo.id} draggableId={todo.id} index={index}>
            {(provided) => (
              <div
                className="flex justify-between items-center gap-4 bg-slate-400 mb-2 p-2 rounded-md max-w-96 min-h-12 max-h-20"
                onMouseEnter={() => setHoveredTodoId(todo.id)}
                onMouseLeave={() => setHoveredTodoId(null)}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {isEditing ? (
                  <div className="flex justify-between items-center flex-1 gap-2">
                    <input
                      type="text"
                      name="todo"
                      id="edittodo"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      className="bg-gray-300 hover:bg-gray-200 p-2 rounded-md"
                      onClick={() => handleSaveEdit(todo)}
                    >
                      ✔️
                    </button>

                    <button
                      className="bg-gray-300 hover:bg-gray-200 p-2 rounded-md"
                      onClick={() => setEditingTodoId(null)}
                    >
                      ✖️
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-gray-800 font-medium text-[15px] max-w-80 text-wrap">
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
                          onClick={() => removeTodo(todo.category, todo.id)}
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
