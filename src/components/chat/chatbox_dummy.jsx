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

export const Chatbox_dummy = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userName, setUser] = useState(" ");
  const [currChat, setCurrChat] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [newChatItem, setNewChatItem] = useState([]);

  function nameInputted(name) {
    setUser(name);
  }

  function newChat(newName) {
    //const chat = { name: newName};
    const newChats = [...chats, newName];
    setChats(newChats);
    console.log("New chat: " + newName);
    chatSelected(newName);
  }

  function chatSelected(chat) {
    setCurrChat(chat);
    console.log("Current chat: " + chat);
  }

  function newMessageInputted(newMessage) {
    const message = {
      chatId: currChat,
      username: userName,
      text: newMessage,
    };
    setMessages([...messages, message]);
    console.log("New message added: " + message.text);
  }

  return (
    <div className="Chat">
      <Box sx={{ flexGrow: 1, margin: 10, border: 2, w: 0.7 }}>
        <div className="box_header">
          <DropDown
            currChat={currChat}
            chats={chats}
            selected={chatSelected}
            newChat={newChat}
          />
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
          <ChatInput handleChange={newMessageInputted} />
        </div>
      </Box>
    </div>
  );
};

const DropDown = (props) => {
  const [selectedChat, setChat] = useState(props.currChat);
  const [newChat, setNewChat] = useState("");
  const [open, setOpen] = useState(false);

  function handleChange(event) {
    setChat(event.target.value);
    event.preventDefault();
    props.selected(event.target.value);
  }

  function submit() {
    handleClose();
    setNewChat(" ");
    props.newChat(newChat);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClick() {
    setOpen(true);
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        alignself="left"
      >
        <TextField
          select
          label="Chat"
          onChange={(event) => handleChange(event)}
          helperText="Select a chat"
          value={selectedChat}
        >
          {props.chats.map((chat) => (
            <MenuItem key={chat} value={chat}>
              {chat}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Button onClick={() => handleClick()}>
        <AddIcon />
      </Button>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter the new chat name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Chat name"
            fullWidth
            variant="standard"
            value={newChat}
            onSubmit={submit}
            onInput={(e) => setNewChat(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={submit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const UserName = (props) => {
  function submit(event) {
    event.preventDefault();
    props.onChange(event.target.value);
  }
  return (
    <TextField
      id="chat_input"
      variant="outlined"
      label="Enter Username"
      sx={{ m: 1, width: "25ch" }}
      required
      onChange={(event) => {
        submit(event);
      }}
      alignself="right"
    />
  );
};

const ChatInput = (props) => {
  const [input, setInput] = useState(" ");

  function handleChange(event) {
    event.preventDefault();
    console.log("Input: " + input);
    props.handleChange(input);
  }

  return (
    <form onSubmit={(event) => handleChange(event)}>
      <TextField
        id="chat_input"
        variant="outlined"
        sx={{ width: 1 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
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
