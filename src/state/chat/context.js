import React, { useReducer } from 'react';
import { chatReducer } from './reducer';

export const ChatContext = React.createContext();

export const ChatProvider = (props) => {
  const [chatState, chatDispatch] = useReducer(chatReducer, {
    username: '',
    chatId: '',
  });

  return (
    <ChatContext.Provider
      value={{
        username: chatState.username,
        chatId: chatState.chatId,
        dispatch: chatDispatch,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};