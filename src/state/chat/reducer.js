export const ChatActions = Object.freeze({
    UPDATE_USERNAME: 'UPDATE_USERNAME',
    UPDATE_CHATID: 'UPDATE_CHATID',
  });
  
  export function chatReducer(state, action) {
    switch (action.type) {
      case ChatActions.UPDATE_USERNAME:
        return updateUsername(state, action);
      case ChatActions.UPDATE_CHATID:
        return updateChatId(state, action);
      default:
        throw new Error(`Chat Reducer does not recognize ${action.type}`);
    }
  }
  
  function updateUsername(state, action) {
    return { ...state, username: action.username };
  }
  
  function updateChatId(state, action) {
    return { ...state, chatId: action.chatId };
  }