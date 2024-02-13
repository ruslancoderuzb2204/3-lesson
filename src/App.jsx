import React, { useReducer, useState } from "react";

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    case "EDIT_TODO":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      if (editingTodoId) {
        dispatch({
          type: "EDIT_TODO",
          payload: { id: editingTodoId, text: inputValue },
        });
        setEditingTodoId(null);
      } else {
        dispatch({ type: "ADD_TODO", payload: inputValue });
      }
      setInputValue("");
    }
  };

  const handleEditTodo = (id) => {
    const todoToEdit = state.todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputValue(todoToEdit.text);
      setEditingTodoId(id);
    }
  };

  const handleCancelEdit = () => {
    setInputValue("");
    setEditingTodoId(null);
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  return (
    <div className="container w-1/3 mt-20 mx-auto p-4">
      <h1 className="text-3xl text-blue-500 text-center font-bold mb-4">
        To-Do App
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mr-2 w-full"
          placeholder="Add To Do"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
          onClick={handleAddTodo}
        >
          {editingTodoId ? "Update" : "Add"}
        </button>
        {editingTodoId && (
          <button
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
      <ul className="list-disc">
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between mb-4 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 mr-2"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </div>
            <div>
              <button
                className={`ml-auto ${
                  editingTodoId === todo.id
                    ? "bg-green-500 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-700"
                } text-white font-bold px-2 py-1 rounded`}
                onClick={() =>
                  editingTodoId === todo.id
                    ? handleAddTodo()
                    : handleEditTodo(todo.id)
                }
              >
                Edit
              </button>
              <button
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
