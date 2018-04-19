import { generateSampleThreads } from "../utils/sample-data";

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
   let newState = { ...state };
   switch (action.type) {
      case ACTIONS.SET_THREADS:
         newState.data = [...action.payload];
         return newState;
      case ACTIONS.SET_ACTIVE_THREAD:
         newState.activeThread = action.payload;
         return newState;
      default:
         return newState;
   }
}
