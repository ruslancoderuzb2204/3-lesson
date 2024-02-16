import React, { useContext, useReducer, useState } from "react";
import { ThemeContext } from "./themes/ThemeProvider";
import Header from "./components/Header";

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
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`container h-screen mx-auto w-full ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <Header />
      <div className="container 2xl:px-96 lg:px-72 md:px-48  sm:px-16 w-full mt-20 mx-auto px-4">
        <h1 className="text-lg lg:text-2xl text-red-400 text-center font-bold mb-4">
          To-Do App
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="border border-gray-300 text-black rounded px-4 py-2 mr-2 w-full"
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
              className={`flex items-center text-lg justify-between mb-4 ${
                todo.completed ? "line-through text-slate-800" : ""
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
    </div>
  );
}
export default App;
