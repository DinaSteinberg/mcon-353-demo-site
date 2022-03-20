import React, { useState } from "react";
//import { TodoContext } from "../../components/todo/TodoContext";

export const TodoContext = React.createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    const newTodos = [...todos, todo];

    setTodos(newTodos);
  }

  function removeTodo(deletedTodo) {
    setTodos(todos.filter((todo) => todo !== deletedTodo));
  }

  function completeTodo(completedTodo) {
    let updatedTodos = todos.map((todo) => {
      if (todo === completedTodo) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        completeTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
