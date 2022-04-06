import { Todo } from "./todo";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoProvider } from "../../state/todo/context";

describe("Todo component", () => {
  test("When a task title is typed ino the input box and the add button is clicked, a todo item will show.", () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    addTask("Mow the lawn");

    //Get the todo element that was added when you clicked the button
    const taskEl = screen.getByTestId("todoItem_text");
    //test that the text is what you want it to be
    expect(taskEl.textContent).toBe("Mow the lawn");
    console.log(taskEl);

    //alternatively, you can use the helper methods we created:
    expect(getAllTasks()).toEqual("Mow the lawn");

    test("view todos", () => {
      addTask("Clean for pesach");
      addTask("Cook a storm");
      addTask("Learn testing");

      expect(getAllTasks()).toEqual([
        "Clean for pesach",
        "Cook a storm",
        "Learn testing",
      ]);
    });
  });
});

function getAllTasks() {
  //use queryAll instead of get. Get and query get one element, queryAll gets many. (Find returns a promist)
  const tasks = screen.queryAllByTestId("todoItem_text");
  return tasks.map((el) => el.textContent);
}

function addTask(text) {
  //Get the input box where you can add a todo
  const inputEl = screen.getByPlaceholderText("Add a Todo");
  //Type the words "Mow the lawn" into the input box
  userEvent.type(inputEl, text);
  //Print the text in the input box to the console so we know it rendered properly.
  console.log(inputEl.value);

  //Businesswise, it's not such a good idea to get element by text because the businessmen
  //might decide to change their minds about what the text is. Rather, reference the test id
  //(For now it's ok cuz the text is not changing.)

  //Get the Button element
  const buttonEl = screen.getByText("Add a Todo");
  //Click the button
  userEvent.click(buttonEl);
}
