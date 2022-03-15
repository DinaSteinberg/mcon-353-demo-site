import Todo from "./todo";
import { render, screen } from "@testing-library/react";
import { TodoProvider } from "../../state/todo/context";

describe("Todo component", () => {
  test("When a task title is typed ino the input box and the add button is clicked, a todo item will show.", () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
    const inputEl = screen.getByPlaceholderText("Add a todo");
    console.log(inputEl);
  });
});
