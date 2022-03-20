import React, { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { IoIosCheckmarkCircleOutline, IoMdTrash } from "react-icons/io";
import { TodoContext } from "../../state/todo/context";

export const Todo = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div data-testid="todo">
      <TodoForm />
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
};

const TodoItem = (props) => {
  const { removeTodo, completeTodo } = useContext(TodoContext);
  return (
    <div className={props.todo.isComplete ? "todo-row-complete" : "todo-row"}>
      {props.todo.text}

      <div className="icons">
        <IconButton onClick={() => completeTodo(props.todo)}>
          <IoIosCheckmarkCircleOutline className="done-icon" />
        </IconButton>

        <IconButton onClick={() => removeTodo(props.todo)}>
          <IoMdTrash className="delete-icon" />
        </IconButton>
      </div>
    </div>
  );
};

const TodoForm = () => {
  const { addTodo } = useContext(TodoContext);
  const [input, setInput] = useState("");

  function textChanged(event) {
    setInput(event.target.value);
  }

  function submit(event) {
    event.preventDefault();
    setInput(" ");

    addTodo({
      text: input,
      isComplete: false,
    });
  }

  return (
    <div>
      <form className="todo-form" onSubmit={(event) => submit(event)}>
        <input
          type="text"
          name="todo"
          placeholder="Add a Todo"
          className="todo-input"
          value={input}
          onChange={(event) => textChanged(event)}
        />
        <button className="todo-button">Add a Todo</button>
      </form>
    </div>
  );
};
