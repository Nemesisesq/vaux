import localStore from "../utils/local-store";
import { ACTIONS } from "./message-duck";

const localStoreMiddleware = store => next => action => {
   const res = next(action);
   if (action.type === ACTIONS.ADD_PLAYED_SOUND) {
      /*
       * not particularly concerned if this fails, since it will be run again
       * and added on the next call of ADD_PLAYED_SOUND. Low priority.
       */
      localStore.saveSet(localStore.STORE_KEYS.PLAYED_SOUNDS, action.payload);
   }
   return res;
};

export default localStoreMiddleware;
