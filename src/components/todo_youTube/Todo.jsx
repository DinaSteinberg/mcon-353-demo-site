import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { IoIosCheckmarkCircleOutline, IoMdTrash } from "react-icons/io";

function Todo(props) {
  return props.todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row-complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id}>{todo.text}</div>
      <div className="icons">
        <IconButton onClick={() => props.finished(todo)}>
          <IoIosCheckmarkCircleOutline className="done-icon" />
        </IconButton>

        <IconButton onClick={() => props.removeTodo(todo)}>
          <IoMdTrash className="delete-icon" />
        </IconButton>
      </div>
    </div>
  ));
}

export default Todo;
