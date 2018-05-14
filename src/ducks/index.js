import { createStore, combineReducers, applyMiddleware } from "redux";

import threadReducer from "./thread-duck";
import messageReducer from "./message-duck";
import localStoreMiddleware from "./local-store-middleware";

const rootReducer = combineReducers({
   message: messageReducer,
   thread: threadReducer
});

export const store = createStore(
   rootReducer,
   applyMiddleware(localStoreMiddleware)
);

export * as thread from "./thread-duck";
export * as message from "./message-duck";
