import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";

import threadReducer from "./thread-duck";
import messageReducer from "./message-duck";
import networkingReducer from "./networking-duck";
import localStoreMiddleware from "./local-store-middleware";

const rootReducer = combineReducers({
   message: messageReducer,
   thread: threadReducer,
   networking: networkingReducer
});

const middleware = [
    promiseMiddleware,
    localStoreMiddleware,
]

export const store = createStore(
   rootReducer,
   applyMiddleware(...middleware)
);

export * as thread from "./thread-duck";
export * as message from "./message-duck";
export * as networking from "./networking-duck";
