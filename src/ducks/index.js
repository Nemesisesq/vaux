import {createStore, combineReducers, applyMiddleware} from "redux";
import promiseMiddleware from "redux-promise";
import {persistStore, persistReducer} from "redux-persist";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import threadReducer from "./thread-duck";
import messageReducer from "./message-duck";
import networkingReducer from "./networking-duck";
import localStoreMiddleware from "./local-store-middleware";
import authReducer from "./ducks.auth"
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    message: messageReducer,
    thread: threadReducer,
    networking: networkingReducer,
    auth: authReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: hardSet,
    blacklist: ['networking']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
    promiseMiddleware,
    localStoreMiddleware,
]

export const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware),
);

export const persistor = persistStore(store);

export * as thread from "./thread-duck";
export * as message from "./message-duck";
export * as networking from "./networking-duck";
export * as auth from "./ducks.auth"
