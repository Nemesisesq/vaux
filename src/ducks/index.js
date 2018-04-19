import { createStore, combineReducers, applyMiddleware } from "redux";

import threadReducer from "./thread-duck";
import messageReducer from "./message-duck";

const rootReducer = combineReducers({
   message: messageReducer,
   thread: threadReducer
});

export const store = createStore(rootReducer);

export * as thread from "./thread-duck";
export * as message from "./message-duck";
