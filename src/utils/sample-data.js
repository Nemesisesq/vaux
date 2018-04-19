import moment from "moment";
import faker from "faker";

export const SAMPLE_THREAD_IDS = [
   faker.random.uuid(),
   faker.random.uuid(),
   faker.random.uuid(),
   faker.random.uuid(),
   faker.random.uuid(),
   faker.random.uuid(),
   faker.random.uuid(),
   faker.random.uuid(),
   faker.random.uuid()
];

export function generateSampleMessages(n = 10) {
   let messages = [];
   const userId = faker.random.uuid();
   const userName = faker.name.findName();
   const userAvatar = faker.image.avatar();
   for (let i = 0; i < n; i++) {
      messages.push({
         _id: faker.random.uuid(),
         text: faker.lorem.sentence(),
         createdAt: moment(faker.date.past()).toDate(),
         user: {
            _id: userId,
            name: userName,
            avatar: userAvatar
         }
      });
   }
   return messages;
}

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
