import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  AddTask,
  SecurityUpdateGoodSharp,
  TaskSharp,
} from "@mui/icons-material";

export const Todo = () => {
  const [tasks, setTasks] = React.useState([]);
  const [text, setText] = React.useState("");

  function addTask(task) {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    const newTodos = [...tasks, task];

    setTasks(newTodos);
  }

  function removeItem(deletedTodo) {
    setTasks(tasks.filter((todo) => todo !== deletedTodo));
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          "& button": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <input
          className="Todo"
          type="text"
          label="Task"
          onChange={(event) => setText(event.target.value)}
        />
        <TextField
          id="title"
          label="ToDo Title"
          variant="outlined"
          onChange={(event) => setText(event.target.value)}
        />
        <TextField
          id="description"
          label="ToDo Description"
          variant="outlined"
        />
        <Button variant="text" size="small" onclick={addTask}>
          <AddIcon />
        </Button>
      </Box>

      {tasks.map((todo) => (
        <TodoItem text={todo} removeItem={removeItem} />
      ))}
    </div>
  );
};

const TodoList = (props) => {};

const TodoItem = (props) => {
  return (
    <div>
      props.text
      <Button onclick={() => props.removeItem(props.text)}>Delete</Button>
    </div>
  );
};
