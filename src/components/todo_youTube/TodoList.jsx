import React, { useState, useEffect, useRef, useContext } from "react";
import { TodoContext } from "../todo/TodoContext";
import IconButton from "@material-ui/core/IconButton";
import { IoIosCheckmarkCircleOutline, IoMdTrash } from "react-icons/io";

function TodoList() {
  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm />
      <Todo />
    </div>
  );
}

function TodoForm() {
  const { addTodo } = useContext(TodoContext);
  const [input, setInput] = useState(" ");
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo({
      id: Math.floor(Math.random * 10000),
      text: input,
      isComplete: false,
    });
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
        ref={focus}
      />
      <button className="todo-button">Add a Todo</button>
    </form>
  );
}

function Todo() {
  const { todos, removeTodo, completeTodo } = useContext(TodoContext);
  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row-complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id}>{todo.text}</div>
      <div className="icons">
        <IconButton onClick={() => completeTodo(todo)}>
          <IoIosCheckmarkCircleOutline className="done-icon" />
        </IconButton>

        <IconButton onClick={() => removeTodo(todo)}>
          <IoMdTrash className="delete-icon" />
        </IconButton>
      </div>
    </div>
  ));
}

export default TodoList;
