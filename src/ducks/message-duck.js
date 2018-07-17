import Symbol from "es6-symbol";
const INITIAL_STATE = {
   data: {},
   playedSounds: null
};

export const ACTIONS = {
   SET_PLAYED_SOUNDS: Symbol("ACTION/MESSAGE/SET_PLAYED_SOUNDS"),
   ADD_PLAYED_SOUND: Symbol("ACTION/MESSAGE/ADD_PLAYED_SOUND"),
   ADD_MESSAGES: Symbol("ACTION/MESSAGE/ADD_MESSAGE"),
   UPDATE_MESSAGE: Symbol("ACTION/MESSAGE/UPDATE_MESSAGE"),
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
      type: ACTIONS.ADD_PLAYED_SOUND,
      payload: messageId
   };
}

export function setMessagesForThread(threadId, messages) {
   return {
      type: ACTIONS.SET_MESSAGES_FOR_THREAD,
      payload: { threadId, messages }
   };
}

export function addMessages(threadId, messages) {
    messages = messages.map(item => {
        item.user  = {_id : item.user_id};
        return item
    })
   return {
      type: ACTIONS.ADD_MESSAGES,
      payload: { threadId, messages }
   };
}

export function updateMessage(threadId, messageId, data) {
   return {
      type: ACTIONS.UPDATE_MESSAGE,
      payload: { threadId, messageId, data }
   };
}

export default function reducer(state = INITIAL_STATE, action = {}) {
   switch (action.type) {
      case ACTIONS.SET_PLAYED_SOUNDS:
         return {
            ...state,
            playedSounds: action.payload
         };
      case ACTIONS.ADD_PLAYED_SOUND:
         let playedSoundsCopy = new Set(state.playedSounds);
         playedSoundsCopy.add(action.payload);
         console.log("PLAYED SOUNDS TAG:", playedSoundsCopy);
         return {
            ...state,
            playedSounds: playedSoundsCopy
         };
      case ACTIONS.ADD_MESSAGES:
          const udMessages = {
              ...state.data,
              [action.payload.threadId]: [
                  ...action.payload.messages,
                  ...(state.data[action.payload.threadId] || [])
              ]
          };
          return {
            ...state,
            data: udMessages
         };
      case ACTIONS.UPDATE_MESSAGE:
         let { threadId, messageId, data } = action.payload;
         let messages = state.data[action.payload.threadId] || [];
         let messageToUpdateIndex = messages.findIndex(
            ({ _id: id }) => id === messageId
         );
         messages[messageToUpdateIndex] = {
            ...messages[messageToUpdateIndex],
            ...data
         };
         return {
            ...state,
            data: {
               ...state.data,
               [action.payload.threadId]: [...messages]
            }
         };
      case ACTIONS.SET_MESSAGES_FOR_THREAD:
         return {
            ...state,
            data: {
               ...state.data,
               [action.payload.threadId]: [...action.payload.messages]
            }
         };
      default:
         return { ...state };
   }
}
