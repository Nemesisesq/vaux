import { SocketHelper } from "../networking";

const INITIAL_STATE = {
   socketHelper: null,
   error: null
};

const ACTIONS = {
   SET_SOCKET_HELPER: Symbol("ACTION/NETWORKING/SET_SOCKET_HELPER"),
   CLEAR_SOCKET_HELPER: Symbol("ACTION/NETWORKING/CLEAR_SOCKET_HELPER"),
   SET_ERROR: Symbol("ACTION/NETWORKING/ERROR")
};

export async function connect(url) {
   const sh = new SocketHelper();

   debugger
   const success = await sh.connectAsync(url);

   if (success) {
      return {
         type: ACTIONS.SET_SOCKET_HELPER,
         payload: sh
      };
   }

   return {
      type: ACTIONS.SET_ERROR,
      payload: "Unable to reach server.\nPlease try again later. 😔"
   };
}

export async function disconnect() {
   return {
      type: CLEAR_SOCKET_HELPER,
      payload: true
   };
}

export default function reducer(state = INITIAL_STATE, action = {}) {
   switch (action.type) {
      case ACTIONS.SET_SOCKET_HELPER:
         return {
            ...state,
            socketHelper: action.payload,
            error: null
         };
      case ACTIONS.CLEAR_SOCKET_HELPER:
         state.socketHelper.close();
         return {
            ...state,
            socketHelper: null,
            error: null
         };
      case ACTIONS.SET_ERROR:
         return {
            ...state,
            socketHelper: null,
            error: action.payload
         };
      default:
         return { ...state };
   }
}
