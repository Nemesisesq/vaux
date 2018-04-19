const INITIAL_STATE = {
   data: {}
};

const ACTIONS = {
   ADD_MESSAGE: Symbol("ACTION/MESSAGE/ADD_MESSAGE"),
   SET_MESSAGES_FOR_THREAD: Symbol("ACTION/MESSAGE/SET_MESSAGES_FOR_THREAD")
};

export function setMessagesForThread(threadId, messages) {
   return {
      type: ACTIONS.SET_MESSAGES_FOR_THREAD,
      payload: { threadId, messages }
   };
}

export function addMessage(threadId, message) {
   return {
      type: ACTIONS.ADD_MESSAGE,
      payload: { threadId, message }
   };
}

export default function reducer(state = INITIAL_STATE, action = {}) {
   let newState = { ...state };
   switch (action.type) {
      case ACTIONS.ADD_MESSAGE:
         // NOTE: may need to create a deep copy here (or explore other
         // methods, since that would be very expensive)
         newState.data[action.payload.threadId] =
            newState.data[action.payload.threadId] || [];
         newState.data[action.payload.threadId].push(action.payload.message);
         return newState;
      case ACTIONS.SET_MESSAGES_FOR_THREAD:
         newState.data[action.payload.threadId] = action.payload.messages;
         return newState;
      default:
         return newState;
   }
}
