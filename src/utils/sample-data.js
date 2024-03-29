import moment from "moment";
import faker from "faker";

import { SOUNDS } from "../constants";

/// Sample thread ids
export const SAMPLE_THREAD_IDS = [faker.random.uuid()];

/**
 * Generates a URL for a randomly dimensioned placeholder image
 * @return {String} the image URL
 */
function placeholderImageURL() {
   const baseURL = "https://picsum.photos";
   const width = Math.ceil(Math.random() * 600 + 300);
   const height = Math.ceil(Math.random() * 400 + 100);
   return `${baseURL}/${width}/${height}?random`;
}

/**
 * Generates sample messages for test purposes.
 * @param  {Number} [n=10] the number of sample messages to generate
 * @return {[Object]}      an array of message objects
 */
export function generateSampleMessages(n = 10) {
   let messages = [];
   const userId = faker.random.uuid();
   const userName = faker.name.findName();
   const userAvatar = faker.image.avatar();
   for (let i = 0; i < n; i++) {
      let msg = {
         _id: faker.random.uuid(),
         text: faker.lorem.sentence(),
         createdAt: moment(faker.date.past()).toDate(),
         user: {
            _id: userId,
            name: userName,
            avatar: userAvatar
         }
      };
      // add an image some of the time
      if (faker.random.boolean() && faker.random.boolean()) {
         msg.image = placeholderImageURL();
         delete msg.text;
      }
      // add a sound some of the time
      if (faker.random.boolean() && faker.random.boolean()) {
         /*
          * NOTE: the sound will come in as a string from the API, and must
          * then use the `SOUNDS` dictionary to find the appropriate module
          * replacement before being sent to redux.
          */
         msg.sound = SOUNDS.SOUND_1;
      }
      messages.push(msg);
   }
   return messages;
}

/**
 * Generates sample threads to represent users.
 * @param  {Number} [n=10]     the number of sample threads to generate
 * @param  {Object} [options={ threadIds:    [] }] the thread ids to use
 * @return {[Object]}            an arrat of thread objects
 */
export function generateSampleThreads(n = 10, options = { threadIds: [] }) {
   let threads = [];
   for (let i = 0; i < n; i++) {
      threads.push({
         id: options.threadIds[i] || faker.random.uuid(),
         lastMessageAt: new Date(faker.date.past()),
         name: faker.name.findName(),
         imageURL: faker.image.avatar(),
         new: faker.random.boolean()
      });
   }
   return threads;
}
