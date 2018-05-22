const INITIAL_STATE = {
   data: [],
   activeThread: null
};

const ACTIONS = {
   SET_THREADS: Symbol("ACTION/THREAD/SET_THREADS"),
   SET_ACTIVE_THREAD: Symbol("ACTION/THREAD/SET_ACTIVE_THREAD")
};

export function setThreads(threads) {
   return {
      type: ACTIONS.SET_THREADS,
      payload: threads
   };
}

export function setActiveThread(threadId) {
   return {
      type: ACTIONS.SET_ACTIVE_THREAD,
      payload: threadId
   };
}

export default function reducer(state = INITIAL_STATE, action = {}) {
   switch (action.type) {
      case ACTIONS.SET_THREADS:
         return {
            ...state,
            data: [...action.payload]
         };
      case ACTIONS.SET_ACTIVE_THREAD:
         return {
            ...state,
            activeThread: action.payload
         };
      default:
         return { ...state };
   }
}
