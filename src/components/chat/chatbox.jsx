import React, { useState, useContext, useEffect, useRef } from "react";
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

import { ChatContext } from "../../state/chat/context";
import { ChatActions } from "../../state/chat/reducer";

export const Chatbox = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [username, setUser] = useState(" ");
  const [currChat, setCurrChat] = useState("");

  function useInterval(callback, delay, ...callbackParams) {
    const savedCallback = useRef();

    // remember the latest callback
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // setup the interval
    useEffect(() => {
      function tick() {
        savedCallback.current(callbackParams);
      }

      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [callback, delay, callbackParams]);
  }

  function fetchChats() {
    fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`)
      .then((response) => response.json())
      .then((data) => {
        setChats(data.Items);
      });
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useInterval(
    (params) => {
      const chatId = currChat;
      console.log("ChatId: " + chatId + " currChat: " + currChat);
      fetch(
        `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${chatId}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.Items);
        });
    },
    1000, // fast polling
    //60000, // slow polling
    currChat.id
  );

  function nameInputted(name) {
    setUser(name);
    console.log(username);
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
      .then((data) => {
        setCurrChat(data.Item.id);
        setChats([...chats, data.Item]);
      });
  }

  function chatSelected(chat) {
    if (chat != null) {
      fetch(
        "https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/" +
          `${chat}` +
          "/messages"
      )
        .then((response) => response.json())
        .then((data) => setMessages(data.Items));
      setCurrChat(chat);
      console.log("Current chat: " + `${chat}`);
    }
  }

  function setChatId(chatId) {
    setCurrChat(chatId);
  }

  function newMessageInputted(message) {
    const newMessage = {
      chatId: currChat,
      username: username,
      text: message,
    };
    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify(newMessage),
    });
  }

  return (
    <div className="Chat">
      <Box sx={{ flexGrow: 1, margin: 10, border: 2, w: 0.7 }}>
        <div className="box_header">
          <DropDown
            get={fetchChats}
            currChat={currChat}
            chats={chats}
            selected={chatSelected}
            newChat={newChat}
            curr={currChat}
            setId={setChatId}
          />
          <UserName onChange={nameInputted} />
        </div>
        <Divider />
        <div className="box_body">
          <div>
            {messages.map((chat, index) => (
              <DisplayChat chat={chat} key={index} user={username} />
            ))}
          </div>
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
  const current = props.curr;
  const [selectedChat, setChat] = useState(current);
  const [newChat, setNewChat] = useState("");
  const [open, setOpen] = useState(false);

  function chatSelected(event) {
    setChat(event.target.value);
    event.preventDefault();
    // props.selected(event.target.value);
    props.setId(event.target.value);
  }

  function submitNewChat() {
    handleClose();
    setNewChat("");
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
          onChange={(event) => chatSelected(event)}
          helperText="Select a chat"
          value={selectedChat}
          onClick={props.get}
        >
          {props.chats.map((chat, index) => (
            <MenuItem key={index} value={chat.id}>
              {chat.name != null ? chat.name : chat.id}
            </MenuItem>
          ))}
        </TextField>

        <Button onClick={() => handleClick()}>
          <AddIcon />
        </Button>
      </Box>
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
            onSubmit={submitNewChat}
            onInput={(e) => setNewChat(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={submitNewChat}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const UserName = (props) => {
  const [input, setInput] = useState(" ");

  function submit(event) {
    event.preventDefault();
    props.onChange(input);
  }

  function handleInput(e) {
    setInput(e.target.value);
    console.log("Input: " + input);
  }

  return (
    <form onSubmit={(event) => submit(event)}>
      <TextField
        id="username_input"
        variant="outlined"
        label="Enter Username"
        sx={{ m: 1, width: "25ch" }}
        value={input}
        onInput={handleInput}
      />
    </form>
  );
};

const ChatInput = (props) => {
  const [input, setInput] = useState(" ");
  function handleChange(event) {
    event.preventDefault();
    setInput("");
    props.handleChange(input);
  }

  return (
    <form onSubmit={(event) => handleChange(event)}>
      <TextField
        id="chat_input"
        variant="outlined"
        sx={{ width: 1 }}
        value={input}
        onInput={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

const DisplayChat = (props) => {
  const name = props.chat.username == undefined ? "" : props.chat.username;
  return (
    <Card
      sx={{ m: 2, zIndex: "right" }}
      className={name == props.user ? "outgoing" : "incoming"}
    >
      <CardContent>
        <Typography key={props.key}>
          {name}: {props.chat.text}
        </Typography>
      </CardContent>
    </Card>
  );
};
