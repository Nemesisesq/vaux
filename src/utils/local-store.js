import { AsyncStorage } from "react-native";

/// The keys of items stored locally
const STORE_KEYS = {
   INITIALIZED: "@VauxStore:initalized",
   PLAYED_SOUNDS: "@VauxStore:playedsounds"
};

/// Inital values of items stored locally (serialized)
const INITAL_VALUES = {
   [STORE_KEYS.PLAYED_SOUNDS]: JSON.stringify([])
};

/// Returned upon executing a store action.
class StoreResult {
   constructor(data, success, error) {
      this.data = error;
      this.success = success;
      this.error = error;
   }
}

/**
 * Parses a JSON array into a javascript Set object
 * @param  {String} data a JSON array
 * @return {Set} the resultant set
 */
function parseSet(data) {
   const arr = JSON.parse(data);
   const s = new Set(arr);
   return s;
}

/**
 * Converts a set into an Array, and then serializes to JSON
 * @param  {Set} s the set to stringify
 * @return {String} the set represented as a JSON array
 */
function stringifySet(s) {
   const arr = Array.from(s);
   const data = JSON.stringify(arr);
   return data;
}

/**
 * Attempts to save a key to the device store.
 * @param  {String} k the key of the value to save
 * @param  {Any} v the value to save
 * @return {StoreResult} the result
 */
async function save(k, v) {
   try {
      await AsyncStorage.setItem(k, v);
      return new StoreResult(null, true, null);
   } catch (error) {
      return new StoreResult(null, false, error);
   }
}

/**
 * Attempts to retrieve a key from the local device store.
 * @param  {String} k the key of the item to retrieve
 * @return {StoreResult} the result
 */
async function retrieve(k) {
   try {
      const v = await AsyncStorage.getItem(k);
      return new StoreResult(v, true, null);
   } catch (error) {
      return new StoreResult(null, false, error);
   }
}

/**
 * Convenience method to save a set to local storage
 * @param  {String} k the key of the set to save
 * @param  {Set} s the set to save
 * @return {StoreResult} the result of the save operation
 */
async function saveSet(k, s) {
   const v = stringifySet(s);
   const res = await save(k, v);
   return res;
}

/**
 * Convenience method to retrieve a set from local storage
 * @param  {String} k the key of the set to retrieve
 * @return {StoreResult} the result of the retrieval
 */
async function retrieveSet(k) {
   let res = await retrieve(k);
   res.data = parseSet(res.data);
   return res;
}

/**
 * initializes the store with starting values, if needed
 * @return {StoreResult} the result of initialization
 */
async function initialize() {
   const res = await retrieve(STORE_KEYS.INITIALIZED);
   if (res.success && res.data === null) {
      let initializationSuccessful = true;
      for (let k of Object.keys(INITAL_VALUES)) {
         const saveRes = await save(k, INITAL_VALUES[k]);
         initializationSuccessful = initializationSuccessful && saveRes.success;
      }
      if (!initializationSuccessful) {
         return new StoreResult(
            null,
            false,
            "Unable to initialize store values."
         );
      }
      const confirmRes = await save(STORE_KEYS.INITIALIZED, "true");
      if (!confirmRes.success) {
         return new StoreResult(
            null,
            false,
            "Unable to confirm initalization."
         );
      }
      return new StoreResult(null, true, null);
   } else if (!res.success) {
      return new StoreResult(null, false, "Unable to reach store.");
   }
   // otherwise, store was already initialized
   return new StoreResult(null, true, null);
}

export default {
   STORE_KEYS,
   INITAL_VALUES,
   save,
   retrieve,
   retrieveSet,
   saveSet,
   initialize
};
