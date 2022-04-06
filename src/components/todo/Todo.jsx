import React, { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { IoIosCheckmarkCircleOutline, IoMdTrash } from "react-icons/io";
import { TodoContext } from "../../state/todo/context";

export const Todo = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div data-testid="todo" className="Todo">
      <TodoForm />
      {todos.map((todo, index) => (
        <TodoItem todo={todo} i={index} />
      ))}
    </div>
  );
};

const TodoItem = (props) => {
  const { removeTodo, completeTodo } = useContext(TodoContext);
  return (
    <div
      className={props.todo.isComplete ? "todo-row-complete" : "todo-row"}
      key={props.i}
      data-testid="todoItem"
    >
      <span data-testid="todoItem_text">{props.todo.text}</span>
      <div className="icons" data-testid="todoItem_icons">
        <IconButton
          onClick={() => completeTodo(props.todo)}
          data-testid="todoItem_icon_check"
        >
          <IoIosCheckmarkCircleOutline className="done-icon" />
        </IconButton>

        <IconButton
          onClick={() => removeTodo(props.todo)}
          data-testid="todoItem_icon_delete"
        >
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
