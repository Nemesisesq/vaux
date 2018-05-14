const INITIAL_STATE = {
   data: {},
   playedSounds: null
};

export const ACTIONS = {
   SET_PLAYED_SOUNDS: Symbol("ACTION/MESSAGE/SET_PLAYED_SOUNDS"),
   ADD_PLAYED_SOUND: Symbol("ACTION/MESSAGE/ADD_PLAYED_SOUND"),
   ADD_MESSAGE: Symbol("ACTION/MESSAGE/ADD_MESSAGE"),
   SET_MESSAGES_FOR_THREAD: Symbol("ACTION/MESSAGE/SET_MESSAGES_FOR_THREAD")
};

export function setPlayedSounds(playedSounds) {
   return {
      type: ACTIONS.SET_PLAYED_SOUNDS,
      payload: playedSounds
   };
}

export function addPlayedSound(messageId) {
   return {
      type: ACTIONS.SET_PLAYED_SOUNDS,
      payload: messageId
   };
}

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
      case ACTIONS.SET_PLAYED_SOUNDS:
         newState.playedSounds = action.payload;
         return newState;
      case ACTIONS.ADD_PLAYED_SOUND:
         newState.playedSounds.add(action.payload);
         return newState;
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
