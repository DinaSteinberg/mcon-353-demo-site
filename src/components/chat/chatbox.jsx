import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export const Chatbox = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userName, setUser] = useState(" ");
  const [open, setOpen] = useState(false);
  var currChat = {};

  fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats")
    .then((response) => response.json())
    .then((data) => setChats(data.Items));

  function nameInputted(name) {
    setUser(name);
  }

  function newChat(newName) {
    const chat = {
      name: newName,
    };
    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify(chat),
    })
      .then((response) => response.json())
      .then((data) => setMessages([...messages, data.Items]));
  }

  function chatSelected(chat) {
    console.log(
      "https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/" +
        `${chat}` +
        "/messages"
    );
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMessages(data.Items));
    currChat = chat;
  }

  function handleClose() {
    setOpen(false);
  }

  function chatInputted(newMessage) {
    if (userName != " ") {
      const message = {
        chatId: "New Chat",
        username: userName,
        text: newMessage,
      };
      fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
        },
        body: JSON.stringify(message),
      })
        .then((response) => response.json())
        .then((data) => setMessages([...messages, data.Items]));
    } else {
      setOpen(true);
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User name must be entered to send a chat.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>OK</Button>
        </DialogActions>
      </Dialog>;
    }
  }

  return (
    <div className="chatbox">
      <Box sx={{ flexGrow: 1, margin: 10, border: 2, w: 0.7 }}>
        <div className="box_header">
          <DropDown chats={chats} selected={chatSelected} newChat={newChat} />
          <UserName onChange={nameInputted} />
        </div>
        <Divider />
        <div className="box_body">
          {messages.map((chat) => (
            <DisplayChat chat={chat} />
          ))}
        </div>
        <Divider />
        <div className="box_footer">
          <ChatInput handleChange={chatInputted} />
        </div>
      </Box>
    </div>
  );
};

const DropDown = (props) => {
  const [selectedChat, setChat] = useState("");

  function handleChange(event) {
    setChat(event.target.value);
    event.preventDefault();
    props.selected(event.target.value);
  }

  function submit(event) {
    props.newChat(event.target.value);
  }

  function handleClick() {
    <TextField
      id="new_chat"
      variant="outlined"
      label="Enter Username"
      sx={{ m: 1, width: "25ch" }}
      value={userInput}
      onChange={(event) => {
        submit(event);
      }}
    />;
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      alignSelf="left"
    >
      <TextField
        select
        label="Chat"
        onChange={(event) => handleChange(event)}
        helperText="Select a chat"
        value={selectedChat}
      >
        {props.chats.map((chat) => (
          <MenuItem key={chat.id} value={chat.id}>
            {chat.name != null ? chat.name : chat.id}
          </MenuItem>
        ))}
      </TextField>
      <Button onClick={() => handleClick()}>
        <AddIcon />
      </Button>
    </Box>
  );
};

const UserName = (props) => {
  const [userInput, setInput] = useState("");
  function submit(event) {
    event.preventDefault();
    setInput(" ");

    props.onChange(event.target.value);
  }
  return (
    <TextField
      id="chat_input"
      variant="outlined"
      label="Enter Username"
      sx={{ m: 1, width: "25ch" }}
      value={userInput}
      onChange={(event) => {
        submit(event);
      }}
    />
  );
};

const ChatInput = (props) => {
  const [chatInput, setInput] = useState("");

  function handleChange(event) {
    event.perventDefault();
    setInput(event.target.value);
    props.handleChange(event.target.value);
  }

  return (
    <TextField
      id="chat_input"
      value={chatInput}
      variant="outlined"
      sx={{ width: 1 }}
      onChange={(event) => handleChange(event)}
    />
  );
};

const DisplayChat = (props) => {
  return (
    <Card
      sx={{ m: 2 }}
      className={props.chat.user == props.user ? "outgoing" : "incoming"}
    >
      <CardContent>
        <Typography>
          {props.chat.username}: {props.chat.text}
        </Typography>
      </CardContent>
    </Card>
  );
};
