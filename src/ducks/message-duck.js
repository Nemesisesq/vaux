const INITIAL_STATE = {
   data: {},
   playedSounds: null
};

export const ACTIONS = {
   SET_PLAYED_SOUNDS: Symbol("ACTION/MESSAGE/SET_PLAYED_SOUNDS"),
   ADD_PLAYED_SOUND: Symbol("ACTION/MESSAGE/ADD_PLAYED_SOUND"),
   ADD_MESSAGES: Symbol("ACTION/MESSAGE/ADD_MESSAGE"),
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

export function addMessages(threadId, messages) {
   return {
      type: ACTIONS.ADD_MESSAGES,
      payload: { threadId, messages }
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
         return {
            ...state,
            playedSounds: playedSoundsCopy
         };
      case ACTIONS.ADD_MESSAGES:
         return {
            ...state,
            data: {
               ...state.data,
               [action.payload.threadId]: [
                  ...action.payload.messages,
                  ...(state.data[action.payload.threadId] || [])
               ]
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
